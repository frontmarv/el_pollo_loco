class Character extends MovableObject {
    height = 250;
    width = this.height * 0.51;
    y = 102;
    x = 10;
    speed = 5;
    currentPosition;
    healthPoints = 100;
    offset = {
        x: 32,
        y: 95,
        width: 65,
        height: 107
    };
    IMGAES_IDLE_SHORT = [
        '../imgs/2_character_pepe/1_idle/idle/I-1.png',
        '../imgs/2_character_pepe/1_idle/idle/I-2.png',
        '../imgs/2_character_pepe/1_idle/idle/I-3.png',
        '../imgs/2_character_pepe/1_idle/idle/I-4.png',
        '../imgs/2_character_pepe/1_idle/idle/I-5.png',
        '../imgs/2_character_pepe/1_idle/idle/I-6.png',
        '../imgs/2_character_pepe/1_idle/idle/I-7.png',
        '../imgs/2_character_pepe/1_idle/idle/I-8.png',
        '../imgs/2_character_pepe/1_idle/idle/I-9.png',
        '../imgs/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMGAES_IDLE_LONG = [
        '../imgs/2_character_pepe/1_idle/long_idle/I-11.png',
        '../imgs/2_character_pepe/1_idle/long_idle/I-12.png',
        '../imgs/2_character_pepe/1_idle/long_idle/I-13.png',
        '../imgs/2_character_pepe/1_idle/long_idle/I-14.png',
        '../imgs/2_character_pepe/1_idle/long_idle/I-15.png',
        '../imgs/2_character_pepe/1_idle/long_idle/I-16.png',
        '../imgs/2_character_pepe/1_idle/long_idle/I-17.png',
        '../imgs/2_character_pepe/1_idle/long_idle/I-18.png',
        '../imgs/2_character_pepe/1_idle/long_idle/I-19.png',
        '../imgs/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        '../imgs/2_character_pepe/2_walk/W-21.png',
        '../imgs/2_character_pepe/2_walk/W-22.png',
        '../imgs/2_character_pepe/2_walk/W-23.png',
        '../imgs/2_character_pepe/2_walk/W-24.png',
        '../imgs/2_character_pepe/2_walk/W-25.png',
        '../imgs/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        '../imgs/2_character_pepe/3_jump/J-31.png',
        '../imgs/2_character_pepe/3_jump/J-32.png',
        '../imgs/2_character_pepe/3_jump/J-33.png',
        '../imgs/2_character_pepe/3_jump/J-34.png',
        '../imgs/2_character_pepe/3_jump/J-35.png',
        '../imgs/2_character_pepe/3_jump/J-36.png',
        '../imgs/2_character_pepe/3_jump/J-37.png',
        '../imgs/2_character_pepe/3_jump/J-38.png',
        '../imgs/2_character_pepe/3_jump/J-39.png'
    ];
    IMGAES_HURT = [
        '../imgs/2_character_pepe/4_hurt/H-41.png',
        '../imgs/2_character_pepe/4_hurt/H-42.png',
        '../imgs/2_character_pepe/4_hurt/H-43.png'
    ];
    IMGAES_DEAD = [
        '../imgs/2_character_pepe/5_dead/D-51.png',
        '../imgs/2_character_pepe/5_dead/D-52.png',
        '../imgs/2_character_pepe/5_dead/D-53.png',
        '../imgs/2_character_pepe/5_dead/D-54.png',
        '../imgs/2_character_pepe/5_dead/D-55.png',
        '../imgs/2_character_pepe/5_dead/D-56.png',
        '../imgs/2_character_pepe/5_dead/D-57.png',
    ];
    world;
    isDead = false;
    lastKeyboardEvent = 0;



    constructor() {
        super().loadImage('../imgs/2_character_pepe/1_idle/idle/I-1.png');
        super.loadImages(this.IMGAES_IDLE_SHORT);
        super.loadImages(this.IMGAES_IDLE_LONG);
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_JUMPING);
        super.loadImages(this.IMGAES_HURT);
        super.loadImages(this.IMGAES_DEAD);
        super.applyGravity();
        this.lastKeyboardEvent = new Date().getTime();
        this.animate();

    }

    intervalIds = [];

    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.intervalIds.push(id);
    }

    stopGame() {
        this.intervalIds.forEach(clearInterval);
    }

    checkTimer(timeToCheck) {
        let timePassed = new Date().getTime() - timeToCheck;
        timePassed = timePassed / 1000;
        return timePassed
    }

    animate() {

        this.setStoppableInterval(() => {
            if (this.world.keyboard.LEFT && this.x) {
                this.otherDirection = true;
                this.moveLeft();
            }
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moveRight();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        this.setStoppableInterval(() => {
            if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT || this.world.keyboard.UP || this.world.keyboard.SPACE) {
                this.lastKeyboardEvent = new Date().getTime();
            }
            if (this.checkTimer(this.lastKeyboardEvent) > 5) {
                this.playAnimation(this.IMGAES_IDLE_LONG);
            } else if (this.checkTimer(this.lastKeyboardEvent) > 2) {
                this.playAnimation(this.IMGAES_IDLE_SHORT);
            }
        }, 150);

        this.setStoppableInterval(() => {
            if (this.healthPoints <= 0 && this.isDead) {
                this.playAnimation(this.IMGAES_DEAD);
                this.stopGame();
                return;
            } else if (this.isHurt()) {
                this.playAnimation(this.IMGAES_HURT);
            }
            else if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            } else if ((this.world.keyboard.LEFT || this.world.keyboard.RIGHT) && !this.isAboveGround()) {
                this.playAnimation(this.IMAGES_WALKING);
            };
        }, 60);


        // Jump
        this.setStoppableInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 80);
    }


}

