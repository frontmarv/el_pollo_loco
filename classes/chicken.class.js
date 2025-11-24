class Chicken extends MovableObject {
    height = 50;
    width = this.height * 1.02;
    y = 302;
    x = 200 + Math.random() * 500;
    speed = 0.15;
    IMAGES_WALKING = [
        '../imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('../imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        super.loadImages(this.IMAGES_WALKING);
        this.animate();

    }

    animate() {
        this.moveLeft();
        this.animateWalking();
    }


    moveLeft() {
        const id = setInterval(() => {
            this.x -= this.speed + (Math.random() * 1);
            if (this.x <= 200 || this.x >= 700) {
                clearInterval(id);
            }
        }, 1000 / 60);
    }

    animateWalking() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }
}