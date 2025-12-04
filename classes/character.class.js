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
        '../imgs/2_character_pepe/5_dead/D-56.png'
    ];

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
        this.healthPoints = 100;
        this.dyingFramesPlayed = 0;
        this.offset = {
            x: 32,
            y: 95,
            width: 65,
            height: 100
        };
        super.applyGravity();
        this.lastKeyboardEvent = new Date().getTime();
        this.sounds = {
            snoring: SoundManager.register(new Audio('../audio/character/character-snoring.mp3'), 0.5),
            jumping: SoundManager.register(new Audio('../audio/character/character-jumping.mp3')),
            walking: SoundManager.register(new Audio('../audio/character/character-walking.mp3')),
            hurting: SoundManager.register(new Audio('../audio/character/character-hurt.mp3')),
            dying: SoundManager.register(new Audio('../audio/character/character-dying.mp3'))
        };
        this.sounds.walking.loop = true;
        this.sounds.snoring.loop = true;
    }

    stopCharacterIntervals() {
        this.intervalIds.forEach(clearInterval);
        this.sounds.walking.pause();
        clearInterval(this.applyGravityInterVal);
    }

    animate() {
        this.setStoppableInterval(() => {
            if (this.isMovingLeft()) {
                this.handleMovingLeft();
            }
            else if (this.isMovingRight()) {
                this.handleMovingRight();
            }
            this.adjustCamera();
        }, 1000 / 60);

        this.setStoppableInterval(() => {
            if (this.isAnyKeyPressed()) {
                this.lastKeyboardEvent = new Date().getTime();
            }
            if (!this.isAboveGround()) {
                if (this.checkTimer(this.lastKeyboardEvent, 6)) {
                    this.playIdleLong();
                } else if (this.checkTimer(this.lastKeyboardEvent, 0.1)) {
                    this.playIdleShort();
                } else {
                    this.sounds.snoring.pause();
                }
            }
        }, 150);

        this.setStoppableInterval(() => {
            if (this.isCharacterDead()) {
                this.handleCharacterDeath();
                return;
            } else if (this.isHurt() && !this.isDead) {
                this.handleCharacterHurt();
            }
            else if (this.isCharacterJumping()) {
                this.sounds.jumping.play();
                this.jump();
            } else if (this.isCharacterWalkingOnGround()) {
                this.playAnimation(this.IMAGES_WALKING);
            };
        }, 60);

        this.intervalId = this.setStoppableInterval(() => {
            if (this.isHurt() && this.isAboveGround()) {
                clearInterval(this.intervalId);
                return;
            }
            if (this.isAboveGround()) {
                this.playJumpingAnimation();
            } else {
                this.animationAlreadyPlayed = false;
            }
        }, 1000 / 30);
    }

    isMovingLeft() {
        return this.world.keyboard.LEFT && this.x > 0
    }

    handleMovingLeft() {
        this.otherDirection = true;
        this.sounds.walking.play();
        this.moveLeft();
    }

    isMovingRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x
    }

    handleMovingRight() {
        this.otherDirection = false;
        this.sounds.walking.play();
        this.moveRight();
    }

    adjustCamera() {
        this.world.camera_x = Math.min(0, Math.max(-(this.world.level.level_end_x - this.world.canvas.width + 100), -this.x + 100));
    }

    bounce() {
        this.speedY = 15;
    }

    isAnyKeyPressed() {
        return this.world.keyboard.LEFT || this.world.keyboard.RIGHT || this.world.keyboard.UP || this.world.keyboard.SPACE || this.world.keyboard.THROW
    }

    playIdleLong() {
        this.sounds.snoring.play();
        this.playAnimation(this.IMGAES_IDLE_LONG);
    }

    playIdleShort() {
        this.sounds.walking.pause();
        this.playAnimation(this.IMGAES_IDLE_SHORT);
    }

    isCharacterJumping() {
        return this.world.keyboard.UP && !this.isAboveGround()
    }

    isCharacterDead() {
        return this.healthPoints <= 0 && this.isDead
    }

    handleCharacterHurt() {
        this.sounds.hurting.play();
        this.playAnimation(this.IMGAES_HURT);
    }

    handleCharacterDeath() {
        this.sounds.dying.play();
        this.playAnimation(this.IMGAES_DEAD);
        this.dyingFramesPlayed++;
        console.log(this.dyingFramesPlayed);

    }

    isCharacterWalkingOnGround() {
        return (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) && !this.isAboveGround()
    }

    playJumpingAnimation() {
        if (this.speedY > 24 && !this.animationAlreadyPlayed) {
            this.playAnimation(this.IMAGES_JUMPING[0]);
            this.animationAlreadyPlayed = true;
        } else if (this.speedY > 3) {
            this.img = this.imageCache[this.IMAGES_JUMPING[1]];
        } else if (this.speedY <= 3 && this.speedY > -3) {
            this.img = this.imageCache[this.IMAGES_JUMPING[2]];
        } else if (this.speedY <= -20) {
            this.img = this.imageCache[this.IMAGES_JUMPING[4]];
        } else if (this.speedY <= -3) {
            this.img = this.imageCache[this.IMAGES_JUMPING[3]];
        }
    }
}

