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
    timeSaved = false;

    canvas;
    ctx;
    keyboard;
    camera_x;
    sounds;
    lastThrow = 0;

    /**
     * Get welcome screen visibility state.
     * @returns {boolean}
     */
    get showWelcomeScreen() {
        return this._showWelcomeScreen;
    }

    /**
     * Set welcome screen visibility and start game if value is false.
     * @param {boolean} value - Whether to show the welcome screen.
     * @returns {void}
     */
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

    /**
     * Initialize sound effects and register with SoundManager.
     * @returns {void}
     */
    initSounds() {
        this.sounds = {
            backgroundMusic: SoundManager.register(new Audio('../audio/background-music.mp3')),
            levelCompleted: SoundManager.register(new Audio('../audio/level-completed.mp3'))
        };
        this.sounds.backgroundMusic.loop = true;
    }

    /**
     * Get endboss position as object with x and y coordinates.
     * @returns {object}
     */
    getPositionEndboss() {
        return { x: this.endboss.x, y: this.endboss.y };
    }

    /**
     * Calculate distance between character and endboss.
     * @returns {number}
     */
    getDistanceCharacterEndboss() {
        this.position = this.getPositionEndboss();
        this.distance = this.position.x + 114 - this.character.x;
        return this.distance
    }

    /**
     * Start game loop and initialize all game systems.
     * @returns {void}
     */
    startGame() {
        this.setWorld();
        this.character.animate();
        this.endboss.animate();
        this.checkCollisions();
        this.checkBottleThrow();
        this.endbossHealthbar.setHealthbarPosition();
    }

    /**
     * Stop game and clear all active intervals.
     * @returns {void}
     */
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

    /**
     * Play background music if game is running.
     * @returns {void}
     */
    playMusic() {
        if (!this.showWelcomeScreen) {
            this.sounds.backgroundMusic.play();
        }
    }

    /**
     * Set world reference for all game entities.
     * @returns {void}
     */
    setWorld() {
        this.level.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
        this.character.world = this;
        this.statusbars.forEach(bar => bar.world = this);
        this.endbossHealthbar.world = this;
        this.gameOver.world = this;
    }

    /**
     * Monitor keyboard input and create throwable objects.
     * @returns {void}
     */
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

    /**
     * Check if enough time passed since last throw.
     * @returns {boolean}
     */
    canThrow() {
        let timePassed = new Date().getTime() - this.lastThrow;
        return timePassed > 1000;
    }

    /**
     * Monitor collisions between character, enemies, coins, and bottles.
     * @returns {void}
     */
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

    /**
     * Check character collision with enemy and handle damage or bounce.
     * @param {MovableObject} enemy - Enemy to check collision with.
     * @param {number} index - Index of enemy in enemies array.
     * @returns {void}
     */
    hasCollisionCharacter(enemy, index) {
        if (this.character.isCollidingFromAbove(enemy)) {
            this.handleEnemyHit(enemy, index)
            this.character.bounce();
        } else if (this.character.isColliding(enemy)) {
            this.character.isHit();
            this.healthbar.setPercentageHealth(this.character.healthPoints)
        }
    }

    /**
     * Check bottle collision with enemy and handle removal.
     * @param {MovableObject} enemy - Enemy to check collision with.
     * @param {number} index - Index of enemy in enemies array.
     * @returns {void}
     */
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

    /**
     * Damage enemy and remove if dead.
     * @param {MovableObject} enemy - Enemy to damage.
     * @param {number} index - Index of enemy in enemies array.
     * @returns {void}
     */
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

    /**
     * Check character collision with bottles.
     * @returns {void}
     */
    hasCollisionBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.characterCollectsBottle(bottle)) {
                this.bottlebar.handleBottleCollection(index);
            }
        })
    }

    /**
     * Check character collision with coins.
     * @returns {void}
     */
    hasCollisionCoin() {
        this.level.coins.forEach((collectedCoin, index) => {
            if (this.characterCollectsCoin(collectedCoin)) {
                this.coinbar.handleCoinCollection(index);
                if (this.isCoinbarFull()) {
                    this.getExtraSalsaBottle();
                }
            }
        })
    }

    /**
     * Check if coin bar is full (100%).
     * @returns {boolean}
     */
    isCoinbarFull() {
        return this.coinbar.percentageCoin === 100
    }

    /**
     * Reset coin bar and grant extra bottle when full.
     * @returns {void}
     */
    getExtraSalsaBottle() {
        this.coinbar.setPercentageCoin(-100);
        this.coinbar.sound.allCoinsCollected.play();
        this.bottlebar.setPercentageBottle(20);
    }

    /**
     * Check if character collides with coin.
     * @param {DrawableObject} collectedCoin - Coin to check collision with.
     * @returns {boolean}
     */
    characterCollectsCoin(collectedCoin) {
        return this.character.isColliding(collectedCoin);
    }

    /**
     * Check if character collides with bottle.
     * @param {DrawableObject} bottle - Bottle to check collision with.
     * @returns {boolean}
     */
    characterCollectsBottle(bottle) {
        return this.character.isColliding(bottle)
    }

    /**
     * Draw object with horizontal flip if facing left.
     * @param {MovableObject} mo - Object to draw.
     * @returns {void}
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImg(mo);
        }
        mo.drawMovableObject(this.ctx);
        if (mo.otherDirection) {
            this.flipImgBack(mo);
        }
    }

    /**
     * Draw array of objects to canvas.
     * @param {array} objects - Objects to draw.
     * @returns {void}
     */
    addObjectsToMap(objects) {
        objects.forEach(o => { this.addToMap(o) });
    }

    /**
     * Flip canvas context for left-facing objects.
     * @param {MovableObject} mo - Object to flip.
     * @returns {void}
     */
    flipImg(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restore canvas context after flipping.
     * @param {MovableObject} mo - Object that was flipped.
     * @returns {void}
     */
    flipImgBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Draw array of fixed objects without flipping.
     * @param {array} objects - Objects to draw.
     * @returns {void}
     */
    addFixedObjectsToMap(objects) {
        objects.forEach(object => {
            object.drawFixedObject(this.ctx);
        })
    }

    /**
     * Main render loop for game or welcome screen.
     * @returns {void}
     */
    draw() {
        if (!this._isRunning) { cancelAnimationFrame(this.animationloop); return; }
        if (this.showWelcomeScreen) { this.drawWelcomeScreen(); }
        else { this.drawGameScreen(); }
        this.animationloop = requestAnimationFrame(() => this.draw());
    }

    /**
     * Render all game entities and check win/lose conditions.
     * @returns {void}
     */
    drawGameScreen() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawWorldObjects();
        this.drawStatusBars();
        this.drawEntities();
        this.ctx.translate(-this.camera_x, 0);
        this.checkEndConditions();
    }

    /**
     * Draw background, clouds, coins, and bottles.
     * @returns {void}
     */
    drawWorldObjects() {
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);
        this.addFixedObjectsToMap(this.level.coins);
        this.addFixedObjectsToMap(this.level.bottles);
    }

    /**
     * Draw status bars fixed to screen.
     * @returns {void}
     */
    drawStatusBars() {
        this.ctx.translate(-this.camera_x, 0);
        this.addFixedObjectsToMap(this.statusbars);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draw enemies, character, and throwable objects.
     * @returns {void}
     */
    drawEntities() {
        this.addObjectsToMap(this.level.enemies);
        if (!this.endboss.isDead) { this.endbossHealthbar.drawFixedObject(this.ctx); }
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Check for game over or winning conditions.
     * @returns {void}
     */
    checkEndConditions() {
        if (this.character.isDead && this.character.dyingFramesPlayed > 4) { this.showGameOverScreen(); }
        if (this.allEnemiesDead()) { this.showWinningScreen(); }
    }

    /**
     * Display winning screen and save run time.
     * @returns {void}
     */
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
        if (!this.timeSaved) {
            saveRun();
            this.timeSaved = true;
        }
    }

    /**
     * Display game over screen.
     * @returns {void}
     */
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

    /**
     * Check if all enemies have been defeated.
     * @returns {boolean}
     */
    allEnemiesDead() {
        return this.level.enemies.length < 1
    }

    /**
     * Draw game screen with end screen overlay.
     * @param {DrawableObject} fixedObject - End screen object to draw.
     * @returns {void}
     */
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

    /**
     * Draw welcome screen.
     * @returns {void}
     */
    drawWelcomeScreen() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.welcome.drawFixedObject(this.ctx);
        this.ctx.translate(-this.camera_x, 0);
    }
}




