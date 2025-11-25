class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    offset;

    drawOffsetFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.lineWidth = "2";
            ctx.strokeStyle = "green";
            ctx.beginPath();
            ctx.rect(this.x + this.offset.x, this.y + this.offset.y, this.width - this.offset.width, this.height - this.offset.height);
            ctx.stroke();
        }
    }

    drawMovableObject(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    isColliding(mo) {
        return this.x + this.offset.x + this.width - this.offset.width > mo.x + mo.offset.x &&
            this.y + this.offset.y + this.height - this.offset.height > mo.y + mo.offset.y &&
            this.x + this.offset.x < mo.x + mo.offset.x + mo.width - mo.offset.width &&
            this.y + this.offset.y < mo.y + mo.offset.y + mo.height - mo.offset.height;
    }

    isHit() {
        this.healthPoints -= 5;
        if (this.healthPoints <= 0) {
            this.healthPoints = 0;
            this.isDead = true;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 100;
    }

    jump() {
        this.speedY = 25;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }


}