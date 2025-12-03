class Chicken extends MovableObject {
    IMAGES_WALKING = [
        '../imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGE_DEAD = ['../imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    isDead;
    constructor(lvlLength) {
        super().loadImage('../imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGE_DEAD);
        this.height = 65;
        this.width = this.height * 1.02;
        this.y = 280;
        this.x = 200 + Math.random() * lvlLength;
        this.speed = 0.25 + Math.random() * 0.5;
        this.healthPoints = 5;
        this.offset = {
            x: 0,
            y: -5,
            width: 0,
            height: 0
        };
        this.sounds = {
            dying: SoundManager.register(new Audio('../audio/enemies/chicken-dying.mp3'))
        };
        this.animate();
    }

    animate() {
        this.moveInterval = setInterval(() => {
            if (this.healthPoints <= 0) {
                this.clearIntervalsChicken();
                this.chickenDeadAnimation();
                return;
            }
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
        this.walkingInterval = setInterval(() => {
            if (this.healthPoints <= 0) return;
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    clearIntervalsChicken() {
        clearInterval(this.moveInterval);
        clearInterval(this.walkingInterval);
    }

    chickenDeadAnimation() {
        this.sounds.dying.play();
        this.playAnimation(this.IMAGE_DEAD);
        this.offset.y = 100;
    }
}