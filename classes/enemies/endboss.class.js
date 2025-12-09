class Endboss extends MovableObject {
    IMAGES_WALKING = [
        '../imgs/4_enemie_boss_chicken/1_walk/G1.png',
        '../imgs/4_enemie_boss_chicken/1_walk/G2.png',
        '../imgs/4_enemie_boss_chicken/1_walk/G3.png',
        '../imgs/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        '../imgs/4_enemie_boss_chicken/2_alert/G5.png',
        '../imgs/4_enemie_boss_chicken/2_alert/G6.png',
        '../imgs/4_enemie_boss_chicken/2_alert/G7.png',
        '../imgs/4_enemie_boss_chicken/2_alert/G8.png',
        '../imgs/4_enemie_boss_chicken/2_alert/G9.png',
        '../imgs/4_enemie_boss_chicken/2_alert/G10.png',
        '../imgs/4_enemie_boss_chicken/2_alert/G11.png',
        '../imgs/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        '../imgs/4_enemie_boss_chicken/3_attack/G13.png',
        '../imgs/4_enemie_boss_chicken/3_attack/G14.png',
        '../imgs/4_enemie_boss_chicken/3_attack/G15.png',
        '../imgs/4_enemie_boss_chicken/3_attack/G16.png',
        '../imgs/4_enemie_boss_chicken/3_attack/G17.png',
        '../imgs/4_enemie_boss_chicken/3_attack/G18.png',
        '../imgs/4_enemie_boss_chicken/3_attack/G19.png',
        '../imgs/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        '../imgs/4_enemie_boss_chicken/4_hurt/G21.png',
        '../imgs/4_enemie_boss_chicken/4_hurt/G22.png',
        '../imgs/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        '../imgs/4_enemie_boss_chicken/5_dead/G24.png',
        '../imgs/4_enemie_boss_chicken/5_dead/G25.png',
        '../imgs/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor(lvlLength, difficulty) {
        super().loadImage('../imgs/4_enemie_boss_chicken/2_alert/G5.png');
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_ALERT);
        super.loadImages(this.IMAGES_ATTACK);
        super.loadImages(this.IMAGES_DEAD);
        super.loadImages(this.IMAGES_HURT);
        this.height = 300;
        this.width = this.height * 0.86;
        this.y = 65;
        this.x = lvlLength - 200;
        this.speed = 10;
        this.baseSpeed = this.speed;
        this.offset = {
            x: 20,
            y: 50,
            width: 30,
            height: 60
        };
        this.dyingSoundPlayed;
        this.healthPoints = 15;
        this.firstContactWithCharacter = true;
        this.lastAttack = 0;
        this.attackFramesPlayed = 0;
        this.dyingFramesPlayed = 0;
        this.alertFramesPlayed = 0;
        this.sounds = {
            hurt: SoundManager.register(new Audio('../audio/enemies/endboss-hurt.mp3')),
            attack: SoundManager.register(new Audio('../audio/enemies/endboss-attack.mp3')),
            dying: SoundManager.register(new Audio('../audio/enemies/chicken-dying.mp3'))
        };
        if (difficulty === 'hard') { this.speed = 16; this.healthPoints = 30; }
        super.applyGravity();
    }

    /**
  * Stops Endboss animation interval.
  * @returns {void}
  */
    stopEndbossIntervals() {
        clearInterval(this.EndbossAnimationInterval);
    }

    /**
     * Starts Endboss animation loop.
     * @returns {void}
     */
    animate() {
        this.EndbossAnimationInterval = setInterval(() => {
            if (this.isFirstContactWithCharacter()) { this.handleFirstContact(); }
            if (!this.firstContactWithCharacter) { this.handleMovement(); }
            if (this.isHurt()) { this.playHurt(); }
            if (this.isDead) { this.playDead(); }
        }, 80);
    }

    /**
     * Handles Endboss movement and attack logic.
     * @returns {void}
     */
    handleMovement() {
        if (this.characterIsInRange() && this.readyForNextAttack()) { this.playAttack(); }
        else { this.world.getDistanceCharacterEndboss() > 0 ? this.walkLeft() : this.walkRight(); }
    }

    /**
     * Checks if this is the first contact with the character.
     * @returns {boolean}
     */
    isFirstContactWithCharacter() {
        return this.world.getDistanceCharacterEndboss() < 520 && this.firstContactWithCharacter
    }

    /**
     * Handles first contact animation and state.
     * @returns {void}
     */
    handleFirstContact() {
        this.animateAlert();
        this.alertFramesPlayed++;
        if (this.alertFramesPlayed >= 16) {
            this.firstContactWithCharacter = false;
        }
    }

    /**
     * Plays walking animation.
     * @returns {void}
     */
    animateWalking() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Plays alert animation.
     * @returns {void}
     */
    animateAlert() {
        this.playAnimation(this.IMAGES_ALERT);
    }

    /**
     * Moves Endboss left, updates direction and plays walking animation.
     * @returns {void}
     */
    walkLeft() {
        this.moveLeft();
        this.otherDirection = false;
        this.animateWalking();
    }

    /**
     * Moves Endboss right, updates direction and plays walking animation.
     * @returns {void}
     */
    walkRight() {
        this.moveRight();
        this.otherDirection = true;
        this.animateWalking();
    }

    /**
     * Plays hurt sound and animation.
     * @returns {void}
     */
    playHurt() {
        this.sounds.hurt.play();
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * Plays attack sound and animation, manages attack logic.
     * @returns {void}
     */
    playAttack() {
        this.sounds.attack.play();
        this.playAnimation(this.IMAGES_ATTACK);
        this.attackFramesPlayed++;
        if (this.attackFramesPlayed >= 8) {
            this.speed = this.speed * 3;
            this.jump();
            this.lastAttack = new Date().getTime();
            this.attackFramesPlayed = 0;
            setTimeout(() => {
                this.speed = this.baseSpeed;
            }, 700);
        }
    }

    /**
     * Plays dead sound and animation, stops intervals if finished.
     * @returns {void}
     */
    playDead() {
        if (!this.dyingSoundPlayed) {
            this.sounds.dying.play();
            this.dyingSoundPlayed = true;
        }
        this.y = 85;
        let path = this.IMAGES_DEAD[this.dyingFramesPlayed];
        this.img = this.imageCache[path];
        this.dyingFramesPlayed++;
        if (this.dyingFramesPlayed > 1) { this.stopEndbossIntervals(); }
    }

    /**
     * Checks if Endboss can attack again.
     * @returns {boolean}
     */
    readyForNextAttack() {
        return this.checkTimer(this.lastAttack, 2.5);
    }

    /**
     * Checks if the character is in range for Endboss.
     * @returns {boolean}
     */
    characterIsInRange() {
        return Math.abs(this.world.getDistanceCharacterEndboss()) <= 350
    }
}