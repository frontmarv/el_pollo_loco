class HealthBar extends DrawableObject {

    world;
    IMAGES_HEALTH = [
        '../imgs/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        '../imgs/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../imgs/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../imgs/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../imgs/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        '../imgs/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];


    constructor() {
        super().loadImage('../imgs/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        super.loadImages(this.IMAGES_HEALTH);
        this.x = 5;
        this.y = -10;
        this.height = 40;
        this.width = this.height * 3.8;
        this.percentageHealth = 100;
    }

    /**
     * Set health percentage and update the health bar image.
     * @param {number} percentage - Amount to subtract from health percentage.
     * @returns {void}
     */
    setPercentageHealth(percentage) {
        this.percentageHealth = percentage;
        let index = this.resolveImgIndex(percentage);
        let path = this.IMAGES_HEALTH[index];
        this.img = this.imageCache[path];
    }
}
