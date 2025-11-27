class Coin extends DrawableObject {

    constructor(lvlLength) {
        super().loadImage('../imgs/8_coin/coin_2.png');
        this.x = 200 + Math.random() * lvlLength;
        this.y = 35 + Math.random() * 30;
        this.height = 100;
        this.width = 100;
        this.offset = {
            x: 34,
            y: 34,
            width: 68,
            height: 68
        };
    }
}