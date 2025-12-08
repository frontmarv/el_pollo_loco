class BottleBar extends DrawableObject {

    world;
    lastThrow = 0;
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
        this.x = 5;
        this.y = 90;
        this.height = 40;
        this.width = this.height * 3.8;
        this.percentageBottle = 0;
        this.sound = { collectBottle: SoundManager.register(new Audio('../audio/item-collected.mp3'), 0.5) };
    }

    /**
     * Increases the bottle percentage and updates status bar.
     * @returns {void}
     * @param {number} percentage - Amount to add to bottle percentage.
     */
    setPercentageBottle(percentage) {
        this.percentageBottle += percentage;
        this.updateBottleStatusbar();
    }

    /**
     * Updates the bottle status bar image.
     * @returns {void}
     */
    updateBottleStatusbar() {
        let index = this.resolveImgIndex(this.percentageBottle);
        let path = this.IMAGES_BOTTLEBAR[index];
        this.img = this.imageCache[path];
    }

    /**
     * Handles logic when a bottle is collected.
     * @param {number} index - Index of bottle in level bottles array.
     * @returns {void}
     */
    handleBottleCollection(index) {
        this.sound.collectBottle.currentTime = 0;
        this.sound.collectBottle.play();
        this.world.level.bottles.splice(index, 1);
        this.setPercentageBottle(20);
    }

    /**
     * Checks if bottle can be thrown.
     * @returns {boolean}
     */
    canThrow() {
        return this.checkTimer(this.lastThrow, 1);
    }
}
