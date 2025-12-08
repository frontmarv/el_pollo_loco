class ThrowableObject extends MovableObject {
    sound;
    BOTTLE_ROTATION = [
        '../imgs/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../imgs/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../imgs/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../imgs/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    BOTTLE_SPLASH = [
        '../imgs/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../imgs/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../imgs/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../imgs/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../imgs/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../imgs/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(characterPosition, characterDirection) {
        super().loadImage(this.BOTTLE_ROTATION[0]);
        super.loadImages(this.BOTTLE_ROTATION);
        super.loadImages(this.BOTTLE_SPLASH);
        this.x = characterPosition + 40;
        this.y = 240;
        this.speed = 25;
        this.otherDirection = characterDirection;
        this.height = 50;
        this.width = 50;
        this.speedY = 25;
        this.isDead = false;
        this.offset = {
            x: 8,
            y: 0,
            width: 10,
            height: 0
        };
        this.sounds = {
            throwBottle: SoundManager.register(new Audio('../audio/object-throw.mp3')),
            splash: SoundManager.register(new Audio('../audio/bottle-hit.mp3')),
        };
        this.animateBottle();
    }

    /**
     * Start bottle movement and rotation animation.
     * @returns {void}
     */
    animateBottle() {
        this.throwBottle();
        this.checkIfSplashed();
    }

    /**
     * Clear bottle movement and splash intervals.
     * @returns {void}
     */
    stopBottleIntervals(){
        clearInterval(this.throwingInterval);
        clearInterval(this.splashingInverval);
    }

    /**
     * Move bottle and play rotation animation every 60ms.
     * @returns {void}
     */
    throwBottle() {
        this.throwingInterval = setInterval(() => {
            if (this.otherDirection) { this.x -= this.speed; }
            else {
                this.x += this.speed;
            }
            this.playAnimation(this.BOTTLE_ROTATION);
        }, 60);
        this.sounds.throwBottle.play();
        this.applyGravity();
    }

    /**
     * Monitor bottle state and trigger splash animation when dead.
     * @returns {void}
     */
    checkIfSplashed() {
        this.splashingInverval = setInterval(() => {
            if (this.isDead && this.y < 500) {
                clearInterval(this.throwingInterval);
                if (!this.splashhSoundPlayed) {
                    this.sounds.splash.play();
                }
                this.splashhSoundPlayed = true;
                this.playSplashAnimation();
            }
        }, 1000 / 60);
    }

    /**
     * Play splash animation for 6 frames.
     * @returns {void}
     */
    playSplashAnimation() {
        this.playAnimationOnce(this.BOTTLE_SPLASH, 6);
    }

    /**
     * Mark bottle as dead if it falls below 1000px.
     * @returns {void}
     */
    setBottleDead() {
        if (this.y > 1000) {
            this.isDead = true;
        }
    }
}