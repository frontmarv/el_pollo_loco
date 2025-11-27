class Cloud extends MovableObject {

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.y = 0;
        this.x = Math.random() * 500;
        this.height = 400;
        this.width = 700;
        this.speed = 0.1;
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


