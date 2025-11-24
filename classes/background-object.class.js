class BackgroundObject extends MovableObject{
    y = 0;
    x = 0;
    height = 400;
    width = 700;

    constructor(imagePath, position_x) {
        super().loadImage(imagePath);
        this.x = position_x;
    }
}