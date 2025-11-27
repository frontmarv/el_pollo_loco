class WinningScreen extends DrawableObject {

    constructor() {
        super().loadImage('../imgs/You won, you lost/You won A.png');
        this.x = 120;
        this.y = 10;
        this.height = 400;
        this.width = this.height * 1.12;
    }
}