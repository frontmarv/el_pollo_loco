class BottleBar extends DrawableObject {
    x = 5;
    y = 90;
    height = 40;
    width = this.height * 3.8;
    percentageBottle = 0;
    world;

    IMAGES_BOTTLEBAR = [
        '../imgs/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        '../imgs/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        '../imgs/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        '../imgs/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        '../imgs/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        '../imgs/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];


    constructor() {
        super().loadImage('../imgs/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png');
        super.loadImages(this.IMAGES_BOTTLEBAR);
    }

    setPercentageBottle(percentage) {
        this.percentageBottle += percentage;
        let index = this.resolveImgIndex(this.percentageBottle);
        let path = this.IMAGES_BOTTLEBAR[index];
        this.img = this.imageCache[path];
    }
}
