class World {
    difficulty;
    character = new Character();
    level;
    healthbar = new HealthBar();
    coinbar = new CoinBar();
    bottlebar = new BottleBar();
    endbossHealthbar = new HealthBarEndboss();
    gameOver = new GameOverScreen();
    youWon = new WinningScreen();
    welcome = new WelcomeScreen();
    statusbars = [this.healthbar, this.coinbar, this.bottlebar];
    endboss;
    throwableObjects = [];
    _isRunning = true;
    _showWelcomeScreen = true;
    winningSoundPlayed = false;

    canvas;
    ctx;
    keyboard;
    camera_x;
    sounds;
    lastThrow = 0;

    get showWelcomeScreen() {
        return this._showWelcomeScreen;
    }

    set showWelcomeScreen(value) {
        this._showWelcomeScreen = value;
        if (!value) {
            this.startGame();
            this.playMusic();
        }
    }

    constructor(canvas, keyboard, difficulty) {
        this.ctx = canvas.getContext('2d');
        this.difficulty = difficulty;
        this.level = createLvl1(this.difficulty);
        this.endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        this.canvas = canvas;
        this.keyboard = keyboard
        this.initSounds();
        this.draw();
    }

    initSounds() {
        this.sounds = {
            backgroundMusic: SoundManager.register(new Audio('../audio/background-music.mp3')),
            levelCompleted: SoundManager.register(new Audio('../audio/level-completed.mp3'))
        };
        this.sounds.backgroundMusic.loop = true;
    }

    getPositionEndboss() {
        return { x: this.endboss.x, y: this.endboss.y };
    }

    getDistanceCharacterEndboss() {
        this.position = this.getPositionEndboss();
        this.distance = this.position.x + 114 - this.character.x;
        return this.distance
    }

    startGame() {
        this.setWorld();
        this.character.animate();
        this.endboss.animate();
        this.checkCollisions();
        this.checkBottleThrow();
        this.endbossHealthbar.setHealthbarPosition();
    }

    stopGame() {
        this._isRunning = false;
        this.level.enemies.forEach((enemy) => {
            if (!enemy instanceof Chicken) {
                enemy.clearInterval(this.applyGravityInterVal)
            }
        });
        this.character.stopCharacterIntervals();
        clearInterval(this.endbossHealthbar.endbossHealthbarInterval);
        this.endboss.stopEndbossIntervals();
    }

    playMusic() {
        if (!this.showWelcomeScreen) {
            this.sounds.backgroundMusic.play();
        }
    }

    setWorld() {
        this.level.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
        this.character.world = this;
        this.statusbars.forEach(bar => bar.world = this);
        this.endbossHealthbar.world = this;
        this.gameOver.world = this;
    }

    checkBottleThrow() {
        setInterval(() => {
            if (this.keyboard.THROW && this.canThrow() && this.bottlebar.percentageBottle > 0) {
                let bottle = new ThrowableObject(this.character.x, this.character.otherDirection);
                this.throwableObjects.push(bottle);
                this.bottlebar.setPercentageBottle(-20);
                this.lastThrow = new Date().getTime();
            }
        }, 60);
    }

    canThrow() {
        let timePassed = new Date().getTime() - this.lastThrow;
        return timePassed > 1000;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                this.hasCollisionCharacter(enemy, index);
                this.hasCollisionThrowableObject(enemy, index);
            })
            this.hasCollisionBottle();
            this.hasCollisionCoin();
        }, 100);
    }

    hasCollisionCharacter(enemy, index) {
        if (this.character.isCollidingFromAbove(enemy)) {
            this.handleEnemyHit(enemy, index)
            this.character.bounce();
        } else if (this.character.isColliding(enemy)) {
            this.character.isHit();
            this.healthbar.setPercentageHealth(this.character.healthPoints)
        }
    }

    hasCollisionThrowableObject(enemy, index) {
        this.throwableObjects.forEach((projectile, projectileIndex) => {
            if (enemy.isColliding(projectile)) {
                this.throwableObjects[projectileIndex].isDead = true;
                this.handleEnemyHit(enemy, index);
                setTimeout(() => {
                    projectile.stopBottleIntervals();
                    this.throwableObjects = this.throwableObjects.filter(obj => !obj.isDead);
                }, 300);
            }
        });
    }

    handleEnemyHit(enemy, index) {
        if (!enemy.isHurt()) {
            enemy.isHit();
            if (enemy instanceof Endboss) {
                this.endbossHealthbar.deductPercentageHealth(this.difficulty === 'hard' ? 17 : 34);
            }
        }
        if (enemy.wasKilled()) {
            setTimeout(() => {
                this.level.enemies = this.level.enemies.filter(enemy => !enemy.isDead);
            }, 1000);
        }
    }

    hasCollisionBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.characterCollectsBottle(bottle)) {
                this.bottlebar.handleBottleCollection(index);
            }
        })
    }

    hasCollisionCoin() {
        this.level.coins.forEach((collectedCoin, index) => {
            if (this.characterCollectsCoin(collectedCoin)) {
                this.coinbar.handleCoinCollection(index);
                if (this.coinbar.percentageCoin === 100) {
                    this.coinbar.setPercentageCoin(-100);
                    this.coinbar.sound.allCoinsCollected.play();
                    this.bottlebar.setPercentageBottle(20);
                }
            }
        })
    }

    characterCollectsCoin(collectedCoin) {
        return this.character.isColliding(collectedCoin);
    }

    characterCollectsBottle(bottle) {
        return this.character.isColliding(bottle)
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImg(mo);
        }
        mo.drawMovableObject(this.ctx);
        if (mo.otherDirection) {
            this.flipImgBack(mo);
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(o => { this.addToMap(o) });
    }

    flipImg(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImgBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    addFixedObjectsToMap(objects) {
        objects.forEach(object => {
            object.drawFixedObject(this.ctx);
        })
    }

    draw() {
        if (!this._isRunning) { cancelAnimationFrame(this.animationloop); return; }
        if (this.showWelcomeScreen) { this.drawWelcomeScreen(); }
        else { this.drawGameScreen(); }
        this.animationloop = requestAnimationFrame(() => this.draw());
    }

    drawGameScreen() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawWorldObjects();
        this.drawStatusBars();
        this.drawEntities();
        this.ctx.translate(-this.camera_x, 0);
        this.checkEndConditions();
    }

    drawWorldObjects() {
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);
        this.addFixedObjectsToMap(this.level.coins);
        this.addFixedObjectsToMap(this.level.bottles);
    }

    drawStatusBars() {
        this.ctx.translate(-this.camera_x, 0);
        this.addFixedObjectsToMap(this.statusbars);
        this.ctx.translate(this.camera_x, 0);
    }

    drawEntities() {
        this.addObjectsToMap(this.level.enemies);
        if (!this.endboss.isDead) { this.endbossHealthbar.drawFixedObject(this.ctx); }
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
    }

    checkEndConditions() {
        if (this.character.isDead && this.character.dyingFramesPlayed > 4) { this.showGameOverScreen(); }
        if (this.allEnemiesDead()) { this.showWinningScreen(); }
    }

    showWinningScreen() {
        this.character.stopCharacterIntervals();
        if (!this.winningSoundPlayed) {
            this.sounds.levelCompleted.play();
            setTimeout(() => {
                document.querySelector('.game-over-menu').style.display = 'flex';
            }, 800);
            this.winningSoundPlayed = true;
        }
        this.drawScreenWithoutEnemies(this.youWon);
    }

    showGameOverScreen() {
        this.character.stopCharacterIntervals();
        this.drawScreenWithoutEnemies(this.gameOver);
        if (!this.gameOverShown) {
            this.gameOverShown = true;
            setTimeout(() => {
                document.querySelector('.game-over-menu').style.display = 'flex';
            }, 800);
        }
    }

    allEnemiesDead() {
        return this.level.enemies.length < 1
    }

    drawScreenWithoutEnemies(fixedObject) {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        fixedObject.drawFixedObject(this.ctx);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
    }

    drawWelcomeScreen() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.welcome.drawFixedObject(this.ctx);
        this.ctx.translate(-this.camera_x, 0);
    }
}




