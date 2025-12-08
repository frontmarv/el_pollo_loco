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

    /**
     * Reduce health percentage and update the health bar image.
     * @param {number} percentage - Amount to subtract from health percentage.
     * @returns {void}
     */
    deductPercentageHealth(percentage) {
        this.percentageHealth -= percentage;
        let index = this.resolveImgIndex(this.percentageHealth);
        let path = this.IMAGES_HEALTH[index];
        this.img = this.imageCache[path];
    }

    /**
     * Track the endboss position and update the health bar coordinates every 80ms.
     * @returns {void}
     */
    setHealthbarPosition() {
        this.endbossHealthbarInterval = setInterval(() => {
            this.position = this.world.getPositionEndboss();
            this.x = this.position.x + 60;
            this.y = this.position.y - 15;
        }, 80);
    }
}
