class Character extends MovableObject {

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
        '../imgs/2_character_pepe/3_jump/J-33.png',
        '../imgs/2_character_pepe/3_jump/J-34.png',
        '../imgs/2_character_pepe/3_jump/J-35.png',
        '../imgs/2_character_pepe/3_jump/J-36.png',
        '../imgs/2_character_pepe/3_jump/J-37.png',
        '../imgs/2_character_pepe/3_jump/J-38.png'
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
    sounds;
    world;
    isDead = false;
    lastKeyboardEvent = 0;
    animationAlreadyPlayed = false;

    constructor() {
        super().loadImage('../imgs/2_character_pepe/1_idle/idle/I-1.png');
        super.loadImages(this.IMGAES_IDLE_SHORT);
        super.loadImages(this.IMGAES_IDLE_LONG);
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_JUMPING);
        super.loadImages(this.IMGAES_HURT);
        super.loadImages(this.IMGAES_DEAD);
        this.height = 250;
        this.width = this.height * 0.51;
        this.y = 102;
        this.x = 10;
        this.speed = 5;
        this.currentPosition;
        this.healthPoints = 100;
        this.offset = {
            x: 32,
            y: 95,
            width: 65,
            height: 100
        };
        super.applyGravity();
        this.lastKeyboardEvent = new Date().getTime();
        this.sounds = {
            snoring: SoundManager.register(new Audio('../audio/character/character-snoring.mp3')),
            jumping: SoundManager.register(new Audio('../audio/character/character-jumping.mp3')),
            walking: SoundManager.register(new Audio('../audio/character/character-walking.mp3')),
            hurting: SoundManager.register(new Audio('../audio/character/character-hurt.mp3')),
            dying: SoundManager.register(new Audio('../audio/character/character-dying.mp3'))
        };
        this.sounds.walking.loop = true;
        this.sounds.snoring.loop = true;
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
            // move left
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.otherDirection = true;
                this.sounds.walking.play();
                this.moveLeft();
            }
            //move right
            else if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.sounds.walking.play();
                this.moveRight();
            }
            else {
                this.sounds.walking.pause();
            }
            this.world.camera_x = Math.min(0, Math.max(-(this.world.level.level_end_x - this.world.canvas.width + 100), -this.x + 100));
        }, 1000 / 60);

        this.setStoppableInterval(() => {
            // idle timer
            if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT || this.world.keyboard.UP || this.world.keyboard.SPACE || this.world.keyboard.THROW) {
                this.lastKeyboardEvent = new Date().getTime();
            }
            if (!this.isAboveGround()) {
                if (this.checkTimer(this.lastKeyboardEvent) > 6) {
                    this.sounds.snoring.play();
                    this.playAnimation(this.IMGAES_IDLE_LONG);
                } else if (this.checkTimer(this.lastKeyboardEvent) > 0.1) {
                    this.playAnimation(this.IMGAES_IDLE_SHORT);
                } else {
                    this.sounds.snoring.pause();
                }
            }
        }, 150);

        this.setStoppableInterval(() => {
            //check if dead
            if (this.healthPoints <= 0 && this.isDead) {
                this.sounds.dying.play();
                this.playAnimation(this.IMGAES_DEAD);
                this.stopGame();
                return;
                // check if hurt
            } else if (this.isHurt()) {
                this.sounds.hurting.play();
                this.playAnimation(this.IMGAES_HURT);
            }
            //jump
            else if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.sounds.jumping.play();
                this.jump();
                //walking animation; prevent walking animtion in air
            } else if ((this.world.keyboard.LEFT || this.world.keyboard.RIGHT) && !this.isAboveGround()) {
                this.playAnimation(this.IMAGES_WALKING);
            };
        }, 60);


        const intervalId = this.setStoppableInterval(() => {
            if (this.isHurt() && this.isAboveGround()) {
                clearInterval(intervalId);
                return;
            }
            if (this.isAboveGround()) {
                if (this.speedY > 5 && !this.animationAlreadyPlayed) {
                    this.playAnimation(this.IMAGES_JUMPING.slice(0, 2));
                    this.animationAlreadyPlayed = true;
                } else if (this.speedY > 0 && this.speedY <= 5) {
                    this.img = this.imageCache[this.IMAGES_JUMPING[3]];
                } else if (this.speedY <= 0 && this.speedY > -10) {
                    this.img = this.imageCache[this.IMAGES_JUMPING[4]];
                } else if (this.speedY <= -10) {
                    this.img = this.imageCache[this.IMAGES_JUMPING[5]];
                }
            } else {
                this.animationAlreadyPlayed = false;
            }
        }, 1000 / 30);
    }

    bounce() {
        this.speedY = 15; 
    }

}

