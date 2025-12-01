class World {
    character = new Character();
    level = createLvl1();
    healthbar = new HealthBar();
    coinbar = new CoinBar();
    bottlebar = new BottleBar();
    endbossHealthbar = new HealthBarEndboss();
    gameOver = new GameOverScreen();
    youWon = new WinningScreen();
    welcome = new WelcomeScreen();
    _showWelcomeScreen = true;
    statusbars = [];
    screens = [];
    throwableObjects = [];
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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.sounds = {
            backgroundMusic: SoundManager.register(new Audio('../audio/background-music.mp3')),
            levelCompleted: SoundManager.register(new Audio('../audio/level-completed.mp3'))
        };
        this.sounds.backgroundMusic.loop = true;
        this.draw();
    }


    startGame() {
        this.setWorld();
        this.character.animate();
        this.checkCollisions();
        this.checkThrowObjects();
    }


    playMusic() {
        if (!this.showWelcomeScreen) {
            this.sounds.backgroundMusic.play();
        }
    }

    setWorld() {
        this.level.world = this;
        this.character.world = this;
        this.healthbar.world = this;
        this.coinbar.world = this;
        this.endbossHealthbar.world = this;
        this.bottlebar.world = this;
        this.gameOver.world = this;
    }

    checkThrowObjects() {
        setInterval(() => {
            if (this.keyboard.THROW && this.canThrow() && this.bottlebar.percentageBottle > 0) {
                let bottle = new ThrowableObject(this.character.x, this.character.otherDirection);
                this.throwableObjects.push(bottle);
                console.log(this.throwableObjects);

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
                this.hasCollisionWithCharacter(enemy, index);
                this.hasCollisionWithThrowableObject(enemy, index);
            })
            this.checkBottles();
            this.checkCoins();

        }, 100);
    }

    hasCollisionWithCharacter(enemy, index) {
        if (this.character.isCollidingFromAbove(enemy)) {
            this.handleEnemyHit(enemy, index)
            this.character.bounce();
        } else if (this.character.isColliding(enemy)) {
            this.character.isHit();
            this.healthbar.setPercentageHealth(this.character.healthPoints)
        }
    }

    hasCollisionWithThrowableObject(enemy, index) {
        this.throwableObjects.forEach((projectile, projectileIndex) => {
            if (enemy.isColliding(projectile) && !(enemy instanceof Chicken)) {
                this.throwableObjects[projectileIndex].isDead = true;
                this.handleEnemyHit(enemy, index);
                setTimeout(() => {
                    this.throwableObjects = this.throwableObjects.filter(obj => !obj.isDead);
                }, 500);
            }
        });
    }

    handleEnemyHit(enemy, index) {
        if (!enemy.isHurt())
            enemy.isHit();
        if (enemy.wasKilled()) {
            setTimeout(() => {
                this.level.enemies.splice(index, 1);
            }, 1000);
        }
    }

    checkBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.characterCollectsBottle(bottle)) {
                this.handleBottleCollection(index);
            }
        })
    }

    checkCoins() {
        this.level.coins.forEach((collectedCoin, index) => {
            if (this.characterCollectsCoin(collectedCoin)) {
                this.handleCoinCollection(index);
            }
        })
    }

    characterCollectsCoin(collectedCoin) {
        return this.character.isColliding(collectedCoin);
    }

    handleCoinCollection(index) {
        this.coinbar.sound.pickupCoin.currentTime = 0;
        this.coinbar.sound.pickupCoin.play();
        this.level.coins.splice(index, 1);
        this.coinbar.setPercentageCoin(10);
    }

    characterCollectsBottle(bottle) {
        return this.character.isColliding(bottle)
    }

    handleBottleCollection(index) {
        this.bottlebar.sound.collectBottle.currentTime = 0;
        this.bottlebar.sound.collectBottle.play();
        this.level.bottles.splice(index, 1);
        this.bottlebar.setPercentageBottle(20);
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImg(mo);
        }
        mo.drawMovableObject(this.ctx);
        if (mo.otherDirection) {
            this.flipImgBack(mo);
        }
        mo.drawOffsetFrame(this.ctx);
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
            object.drawOffsetFrame(this.ctx);
        })
    }

    draw() {
        if (this.showWelcomeScreen) { this.drawWelcomeScreen(); }
        else {
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);

            this.ctx.translate(this.camera_x, 0);

            this.addObjectsToMap(this.level.background);
            this.addObjectsToMap(this.level.clouds);
            this.addFixedObjectsToMap(this.level.coins);
            this.addFixedObjectsToMap(this.level.bottles);

            // fixed object camera movement
            this.ctx.translate(-this.camera_x, 0);
            this.endbossHealthbar.drawFixedObject(this.ctx);
            this.healthbar.drawFixedObject(this.ctx);
            this.coinbar.drawFixedObject(this.ctx);
            this.bottlebar.drawFixedObject(this.ctx);
            this.ctx.translate(this.camera_x, 0);
            // until here
            this.addObjectsToMap(this.level.enemies);
            this.addToMap(this.character);
            this.addObjectsToMap(this.throwableObjects);
            this.ctx.translate(-this.camera_x, 0);
        }

        if (this.character.isDead) {
            this.drawScreenWithoutEnemies(this.gameOver);
            setTimeout(() => {
                document.querySelector('.game-over-menu').style.display = 'flex';
            }, 800);
            return;
        }
        if (this.level.enemies.length < 1) {
            this.character.stopGame();
            this.sounds.levelCompleted.play();
            this.drawScreenWithoutEnemies(this.youWon);
            setTimeout(() => {
                document.querySelector('.game-over-menu').style.display = 'flex';
            }, 800);
            return;
        }
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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




