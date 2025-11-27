class DrawableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;
    currentPosition;
    healthPoints;
    offset;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    drawFixedObject(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    resolveImgIndex(percentage) {
        if (percentage == 100) { return 5 }
        else if (percentage > 80) { return 4 }
        else if (percentage > 60) { return 3 }
        else if (percentage > 40) { return 2 }
        else if (percentage > 20) { return 1 }
        else { return 0 }
    }

    
    drawOffsetFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken ||  this instanceof SmallChicken) {
            ctx.lineWidth = "2";
            ctx.strokeStyle = "green";
            ctx.beginPath();
            ctx.rect(this.x + this.offset.x, this.y + this.offset.y, this.width - this.offset.width, this.height - this.offset.height);
            ctx.stroke();
        }
    }

        isColliding(object) {
        return this.x + this.offset.x + this.width - this.offset.width > object.x + object.offset.x &&
            this.y + this.offset.y + this.height - this.offset.height > object.y + object.offset.y &&
            this.x + this.offset.x < object.x + object.offset.x + object.width - object.offset.width &&
            this.y + this.offset.y < object.y + object.offset.y + object.height - object.offset.height;
    }
    
}