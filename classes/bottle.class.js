class Bottle extends DrawableObject {

    SINGLE_BOTTLE = [
        '../imgs/6_salsa_bottle/salsa_bottle.png'
    ];
    BOTTLE_ON_GROUND = [
        '../imgs/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../imgs/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    constructor(lvlLength) {
        super().loadImage(this.BOTTLE_ON_GROUND[Math.floor(Math.random() * 2)]);
        super.loadImages(this.SINGLE_BOTTLE);
        super.loadImages(this.BOTTLE_ON_GROUND);
        this.x = 200 + Math.random() * (lvlLength - 350);
        this.y = 295;
        this.height = 50;
        this.width = 50;
        this.offset = {
            x: 8,
            y: 0,
            width: 10,
            height: 0
        };
    }
}