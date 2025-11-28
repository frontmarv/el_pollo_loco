class ThrowableObject extends MovableObject {
    sound;
    BOTTLE_ROTATION = [
        '../imgs/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../imgs/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../imgs/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../imgs/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    BOTTLE_SPLASH = [
        '../imgs/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../imgs/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../imgs/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../imgs/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../imgs/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../imgs/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(characterPosition, characterDirection) {
        super().loadImage(this.BOTTLE_ROTATION[0]);
        super.loadImages(this.BOTTLE_ROTATION);
        this.x = characterPosition + 40;
        this.y = 240;
        this.speed = 25;
        this.otherDirection = characterDirection;
        this.height = 50;
        this.width = 50;
        this.speedY = 25;
        this.offset = {
            x: 8,
            y: 0,
            width: 10,
            height: 0
        }; 
        this.sound = { throwBottle: SoundManager.register(new Audio('../audio/object-throw.mp3')) };
        this.throwBottle();
    }

    throwBottle() {
        setInterval(() => {
            if (this.otherDirection) { this.x -= this.speed; }
            else {
                this.x += this.speed;
            }
            this.playAnimation(this.BOTTLE_ROTATION);

        }, 60);
        this.sound.throwBottle.play();
        this.applyGravity();
    }
}