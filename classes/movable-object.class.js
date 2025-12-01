class MovableObject extends DrawableObject {
    speed;
    speedY = 0;
    acceleration = 2.5;
    offset;
    otherDirection = false;
    isDead = false;
    lastHit = 0;

    intervalIds = [];

    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.intervalIds.push(id);
    }

    drawMovableObject(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
        return timePassed < 0.4
    }

    wasKilled() {
        return this.isDead
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
            if (this.y >= 102 && this instanceof Character) {
                this.y = 102;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else { return this.y < 102; }
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