class Chicken extends MovableObject {
    height = 50;
    width = this.height * 1.02;
    y = 302;
    x = 200 + Math.random() * 500;
    speed = 0.15 + Math.random() * 0.5;
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
        setInterval(() => {
            if (this.x > 200) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.animateWalking();
    }

    animateWalking() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }
}