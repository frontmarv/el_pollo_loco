class Cloud extends MovableObject {
    y = 0;
    x = Math.random() * 500;
    height = 400;
    width = 700;
    speed = 0.1;

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.animate();
    }

    animate() {
        // ############## >>>>>>>>>>>>>>>>>>>>> Noch anpassen!!!!!!!!!
        const id = setInterval(() => {
            this.x -= this.speed;
            if (this.x <= 0) {
                clearInterval(id);
            }
        }, 1000 / 60);
    }
}


