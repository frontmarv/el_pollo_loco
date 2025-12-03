class HealthBarEndboss extends DrawableObject {

    IMAGES_HEALTH = [
        '../imgs/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        '../imgs/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        '../imgs/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        '../imgs/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        '../imgs/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        '../imgs/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];
    world;


    constructor() {
        super().loadImage('../imgs/7_statusbars/2_statusbar_endboss/blue/blue100.png');
        super.loadImages(this.IMAGES_HEALTH);
        this.x = lvlLength - 200;
        this.y = 50;
        this.height = 40;
        this.width = this.height * 3.8;
        this.percentageHealth = 100;
    }

    deductPercentageHealth(percentage) {
        this.percentageHealth -= percentage;
        let index = this.resolveImgIndex(this.percentageHealth);
        let path = this.IMAGES_HEALTH[index];
        this.img = this.imageCache[path];
        console.log(this.percentageHealth);
    }

    setHealthbarPosition() {
        setInterval(() => {
            this.x = this.world.getPositionXEndboss() + 60;
        }, 300);
    }
}


