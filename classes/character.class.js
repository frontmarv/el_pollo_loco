class Character extends MovableObject {
    height = 250;
    width = this.height * 0.51;
    y = 102;
    x = 10;
    speed = 5;
    currentPosition;
    healthPoints = 100;
    offset = {
        x: 27,
        y: 95,
        width: 70,
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

    constructor() {
        super().loadImage('../imgs/2_character_pepe/1_idle/idle/I-1.png');
        super.loadImages(this.IMGAES_IDLE_SHORT);
        super.loadImages(this.IMGAES_IDLE_LONG);
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_JUMPING);
        super.loadImages(this.IMGAES_HURT);
        super.loadImages(this.IMGAES_DEAD);
        super.applyGravity();
        this.animate();
    }


    animate() {

        setInterval(() => {
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

        setInterval(() => {
            if (this.healthPoints <= 0 && this.isDead) {
                this.playAnimation(this.IMGAES_DEAD);
                return;
            } else if (this.isHurt()) {
                this.playAnimation(this.IMGAES_HURT);
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);

            } else if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();

            } else if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
                this.playAnimation(this.IMAGES_WALKING);
            };
        }, 50);
    }


}
