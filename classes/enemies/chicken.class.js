class Chicken extends MovableObject {
    height = 65;
    width = this.height * 1.02;
    y = 280;
    x = 200 + Math.random() * 900;
    speed = 0.25 + Math.random() * 0.5;
    offset = {
        x: 0,
        y: 0,
        width: 0,
        height: 5
    };
    IMAGES_WALKING = [
        '../imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGE_DEAD = ['../imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    constructor() {
        super().loadImage('../imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGE_DEAD);
        this.animate();

    }

    animate() {
        setInterval(() => {
            if (this.x <= 200) {
                this.otherDirection = true;
            }
            if (this.x >= 1000) {
                this.otherDirection = false;
            }
            if (this.otherDirection == false) {
                this.moveLeft();
            } else { this.moveRight(); }
        }, 1000 / 60);
        this.animateWalking();
    }

    animateWalking() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}