class DrawableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;
    healthPoints;
    offset;

    /**
     * Load a single image from path.
     * @param {string} path - Image file path to load.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Load array of images into cache.
     * @param {array} array - Array of image paths to load.
     * @returns {void}
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Cycle through animation images in loop.
     * @param {array} images - Array of image paths to cycle through.
     * @returns {void}
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Play animation for a specific number of frames.
     * @param {array} images - Array of image paths to play.
     * @param {number} amountOfImgs - Number of frames to play.
     * @returns {void}
     */
    playAnimationOnce(images, amountOfImgs) {
        for (let index = 0; index < amountOfImgs; index++) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    /**
     * Draw object with fixed position on canvas.
     * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
     * @returns {void}
     */
    drawFixedObject(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Map percentage value to image index (0-5).
     * @param {number} percentage - Percentage value to map.
     * @returns {number}
     */
    resolveImgIndex(percentage) {
        if (percentage == 100) { return 5 }
        else if (percentage >= 80) { return 4 }
        else if (percentage >= 60) { return 3 }
        else if (percentage >= 40) { return 2 }
        else if (percentage >= 20) { return 1 }
        else { return 0 }
    }

    /**
     * Check if objects collide using offset boundaries.
     * @param {DrawableObject} object - Object to check collision with.
     * @returns {boolean}
     */
    isColliding(object) {
        return this.x + this.offset.x + this.width - this.offset.width > object.x + object.offset.x &&
            this.y + this.offset.y + this.height - this.offset.height > object.y + object.offset.y &&
            this.x + this.offset.x < object.x + object.offset.x + object.width - object.offset.width &&
            this.y + this.offset.y < object.y + object.offset.y + object.height - object.offset.height;
    }

    /**
     * Check if object collided from above (excludes Endboss).
     * @param {DrawableObject} object - Object to check collision with.
     * @returns {boolean}
     */
    isCollidingFromAbove(object) {
        if (object instanceof Endboss) {
            return false;
        }
        return this.isColliding(object) &&
            this.speedY < 0 &&
            this.y + this.offset.y + this.height - this.offset.height < object.y + object.offset.y + (object.height * 0.8);
    }
}