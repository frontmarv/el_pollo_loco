class WinningScreen extends DrawableObject {
    x = 120;
    y = 10;
    img;
    height = 400;
    width = this.height * 1.12;

    constructor() {
        super().loadImage('../imgs/You won, you lost/You won A.png')
    }
}