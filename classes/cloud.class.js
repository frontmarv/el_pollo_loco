class Cloud extends MovableObject {

    constructor(imagePath, position_x, lvlLength) {
        super().loadImage(imagePath);
        this.y = 0;
        this.x = position_x;
        this.height = 400;
        this.width = 700;
        this.speed = 0.3;
        this.levelEndX = lvlLength;
        this.animate();
    }

/**
 * Move cloud left continuously and reposition when off-screen.
 * @returns {void}
 */
animate() {
    setInterval(() => {
        this.x -= this.speed;
        if (this.x <= -700) {
            this.x = this.levelEndX + 50;
        }
    }, 1000 / 60);
}
}


