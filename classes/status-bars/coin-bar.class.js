class CoinBar extends DrawableObject {
    x = 5;
    y = 40;
    height = 40;
    width = this.height * 3.8;
    percentageCoin = 0;
    world;

    IMAGES_COINBAR = [
        '../imgs/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        '../imgs/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        '../imgs/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        '../imgs/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        '../imgs/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        '../imgs/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'

    ];



    constructor() {
        super().loadImage('../imgs/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png');
        super.loadImages(this.IMAGES_COINBAR);
    }

    setPercentageCoin(percentage) {
        this.percentageCoin += percentage;
        let index = this.resolveImgIndex(this.percentageCoin);
        let path = this.IMAGES_COINBAR[index];
        this.img = this.imageCache[path];
    }
}
