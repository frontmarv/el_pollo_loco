class CoinBar extends DrawableObject {

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
        this.x = 5;
        this.y = 40;
        this.height = 40;
        this.width = this.height * 3.8;
        this.percentageCoin = 0;
        this.amountOfCoins = 0;
    }

    setPercentageCoin(percentage) {
        this.percentageCoin += percentage;
        this.updateCoinStatusbar();
    }

    updateCoinStatusbar() {
        let index = this.resolveImgIndex(this.percentageCoin);
        let path = this.IMAGES_COINBAR[index];
        this.img = this.imageCache[path];
    }

    resetPercentage() {
        this.percentageCoin = 0;
        this.setPercentageCoin(0);
    }

    handleCoinCollection() {
        this.amountOfCoins++;
        this.setPercentageCoin(10);
    }
}
