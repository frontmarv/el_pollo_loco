class Bottle extends DrawableObject {
    x = 200 + Math.random() * 1000;
    y = 295;
    height = 50;
    width = 50;
    offset = {
        x: 8,
        y: 0,
        width: 10,
        height: 0
    };
    SINGLE_BOTTLE = [
        '../imgs/6_salsa_bottle/salsa_bottle.png'
    ];
    BOTTLE_ON_GROUND = [
        '../imgs/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../imgs/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
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

    constructor() {
        super().loadImage(this.BOTTLE_ON_GROUND[Math.floor(Math.random() * 2)]);
        super.loadImages(this.SINGLE_BOTTLE);
        super.loadImages(this.BOTTLE_ON_GROUND);
        super.loadImages(this.BOTTLE_ROTATION);
        super.loadImages(this.BOTTLE_SPLASH);
    }
}