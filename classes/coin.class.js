class Coin extends DrawableObject {
    x = 200 + Math.random() * 1000;
    y = 35 + Math.random() * 30;
    height = 100;
    width = 100;
    offset = {
        x: 34,
        y: 34,
        width: 68,
        height: 68
    };

    constructor() {
        super().loadImage('../imgs/8_coin/coin_2.png');
    }
}