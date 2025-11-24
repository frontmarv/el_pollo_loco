class Character extends MovableObject {
    height = 250;
    width = this.height * 0.51;
    y = canvas.height - 40 - this.height;
    x = 10;
    speed = 5;
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
    IMAGES_JUMP = [
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

    constructor() {
        super().loadImage('../imgs/2_character_pepe/1_idle/idle/I-1.png');
        super.loadImages(this.IMGAES_IDLE_SHORT);
        super.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animateIdleShort() {
        setInterval(() => {
            let i = this.currentImage % this.IMGAES_IDLE_SHORT.length;
            let path = this.IMGAES_IDLE_SHORT[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
                this.playAnimation(this.IMAGES_WALKING)
            };
        }, 50);
    }


}
