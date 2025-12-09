class SmallChicken extends MovableObject {

    IMAGES_WALKING = [
        '../imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../imgs/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../imgs/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = ['../imgs/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    constructor(lvlLength, difficulty) {
        super().loadImage('../imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGE_DEAD);
        this.height = 50;
        this.width = this.height * 1.02;
        this.y = 295;
        this.x = 200 + Math.random() * lvlLength;
        this.speed = 2 + Math.random() * 0.5;
        this.speedY = 0;
        this.offset = {
            x: 2,
            y: 0,
            width: 6,
            height: 10
        };
        this.healthPoints = 5;
        this.deathSoundPlayed;
        this.sounds = {
            dying: SoundManager.register(new Audio('../audio/enemies/small-chicken-dead.mp3'))
        };
        if (difficulty === 'hard') { this.speed = 3.5 + Math.random() * 0.5; }
        super.applyGravity();
        this.animate();
    }

    /**
    * Initialize and start all animation and behavior intervals for the small chicken.
    * This method wires up movement, occasional jumping, walking animation, and death checking.
    *
    * @returns {void}
    */
    animate() {
        this.handleChickenMovement();
        this.letChickenJump();
        this.animateWalking();
        this.playIsDead();
    }

    /**
     * Start the movement interval that moves the chicken left/right within level bounds.
     *
     * The method toggles `otherDirection` when reaching level edges and calls `moveLeft`
     * or `moveRight` on the instance at ~60 FPS.
     *
     * @returns {void}
     */
    handleChickenMovement() {
        this.movingInterval = setInterval(() => {
            if (this.x <= 200) this.otherDirection = true;
            if (this.x >= lvlLength - 400) this.otherDirection = false;
            this.otherDirection ? this.moveRight() : this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Start walking animation interval.
     * Cycles through `IMAGES_WALKING` using `playAnimation` every 200ms.
     *
     * @returns {void}
     */
    animateWalking() {
        this.walkingInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    /**
     * Occasionally trigger a small jump when the chicken is on the ground.
     *
     * Runs on a randomized interval between 500ms and ~2500ms; calls `smallJump`
     * from the superclass when the chicken is not above ground.
     *
     * @returns {void}
     */
    letChickenJump() {
        this.jumpingInterval = setInterval(() => {
            if (!this.isAboveGround()) {
                super.smallJump();
            }
        }, 500 + Math.random() * 2000);
    }

    /**
     * Monitor death state and play death animation/sound once.
     *
     * When `isDead` becomes true this method:
     * - stops movement/jump intervals,
     * - plays the dying sound once,
     * - switches the displayed animation to `IMAGE_DEAD`,
     * - adjusts the collision `offset.y` to 100 to reflect the dead sprite.
     *
     * This check runs every 100ms.
     *
     * @returns {void}
     */
    playIsDead() {
        this.dyingInterval = setInterval(() => {
            if (this.isDead) {
                this.stopSmallChickenIntervals();
                if (!this.deathSoundPlayed) {
                    this.sounds.dying.play();
                }
                this.deathSoundPlayed = true;
                this.playAnimation(this.IMAGE_DEAD);
                this.offset.y = 100;
            }
        }, 100);
    }

    /**
     * Clear intervals that control movement and jumping for this small chicken.
     * This prevents further movement or jumps after the chicken dies.
     *
     * @returns {void}
     */
    stopSmallChickenIntervals() {
        clearInterval(this.movingInterval);
        clearInterval(this.jumpingInterval);
        clearInterval(this.walkingInterval);
    }
}