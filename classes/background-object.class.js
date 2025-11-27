class BackgroundObject extends MovableObject {
    
    constructor(imagePath, position_x) {
        super().loadImage(imagePath);
        this.x = position_x;
        this.y = 0;
        this.height = 400;
        this.width = 700;
    }
}