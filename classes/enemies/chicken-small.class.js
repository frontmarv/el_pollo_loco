class SmallChicken extends MovableObject {

    IMAGES_WALKING = [
        '../imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../imgs/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../imgs/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = ['../imgs/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    constructor(lvlLength) {
        super().loadImage('../imgs/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGE_DEAD);
        this.height = 50;
        this.width = this.height * 1.02;
        this.y = 295;
        this.x = 200 + Math.random() * lvlLength;
        this.speed = 2 + Math.random() * 0.5;
        this.speedY = 0;
        this.offset = {
            x: 5,
            y: 0,
            width: 10,
            height: 10
        };
        this.healthPoints = 5;
        this.sounds = {
            dying: SoundManager.register(new Audio('../audio/enemies/small-chicken-dead.mp3'))
        };
        super.applyGravity();
        this.animate();


    }

    animate() {
        this.movingInterval = setInterval(() => {
            if (!this.isDead) { }
            if (this.x <= 200) {
                this.otherDirection = true;
            }
            if (this.x >= 1000) {
                this.otherDirection = false;
            }
            if (this.otherDirection == false) {
                this.moveLeft();
            } else {
                this.moveRight();
            }
        }, 1000 / 60);

        this.jumpingInterval = setInterval(() => {
            if (!this.isAboveGround()) {
                super.smallJump();
            }
        }, 1500 + Math.random() * 1000);

        this.animateWalking();
        this.playIsDead();
    }

    animateWalking() {
        this.walkingInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    playIsDead() {
        setInterval(() => {
            if (this.isDead) {
                clearInterval(this.movingInterval);
                clearInterval(this.jumpingInterval);
                clearInterval(this.walkingInterval);
                if (!this.deathSoundPlayed) {
                    this.sounds.dying.play();
                }
                this.deathSoundPlayed = true;
                this.playAnimation(this.IMAGE_DEAD);
                this.offset.y = 100;
            }
        }, 100);
    }
}