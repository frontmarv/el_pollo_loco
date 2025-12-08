class CoinBar extends DrawableObject {
    sound;
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
        this.sound = {
            pickupCoin: SoundManager.register(new Audio('../audio/coin-recieved.mp3'), 0.5),
            allCoinsCollected: SoundManager.register(new Audio('../audio/10-coins-collected.mp3'), 0.7),
        };
    }

    /**
     * Increment coin percentage and update the status bar display.
     * @param {number} percentage - Amount to add to coin percentage.
     * @returns {void}
     */
    setPercentageCoin(percentage) {
        this.percentageCoin += percentage;
        this.updateCoinStatusbar();
    }

    /**
     * Update the coin status bar image based on current percentage.
     * @returns {void}
     */
    updateCoinStatusbar() {
        let index = this.resolveImgIndex(this.percentageCoin);
        let path = this.IMAGES_COINBAR[index];
        this.img = this.imageCache[path];
    }

    /**
     * Play coin pickup sound, remove coin from level, and increment coin percentage.
     * @param {number} index - Index of coin in level coins array.
     * @returns {void}
     */
    handleCoinCollection(index) {
        this.sound.pickupCoin.currentTime = 0;
        this.sound.pickupCoin.play();
        this.world.level.coins.splice(index, 1);
        this.setPercentageCoin(10);
    }
}
