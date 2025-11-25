class HealthBar extends DrawableObject {
    x = 5;
    y = -10;
    height = 40;
    width = this.height * 3.8;
    percentageHealth = 100;
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
    }

    setPercentageHealth(percentage) {
        this.percentageHealth = percentage;
        let index = this.resolveImgIndex(percentage);
        let path = this.IMAGES_HEALTH[index];
        this.img = this.imageCache[path];
    }
}
