class MovableObject extends DrawableObject {
    speed;
    speedY = 0;
    acceleration = 2.5;
    offset;
    otherDirection = false;
    isDead = false;
    lastHit = 0;
    intervalIds = [];

    /**
     * Store interval ID for later cleanup.
     * @param {Function} fn - Function to execute at interval.
     * @param {number} time - Interval time in milliseconds.
     * @returns {void}
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.intervalIds.push(id);
    }

    /**
     * Draw object with current position and dimensions.
     * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
     * @returns {void}
     */
    drawMovableObject(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Reduce health by 5 and mark as dead if health reaches 0.
     * @returns {void}
     */
    isHit() {
        this.healthPoints -= 5;
        if (this.healthPoints <= 0) {
            this.healthPoints = 0;
            this.isDead = true;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Check if object was hit within last 0.4 seconds.
     * @returns {boolean}
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.4
    }

    /**
     * Check if object is dead.
     * @returns {boolean}
     */
    wasKilled() {
        return this.isDead
    }

    /**
     * Apply continuous gravity and update vertical position every 40ms.
     * @returns {void}
     */
    applyGravity() {
        this.applyGravityInterVal = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
            if (this.y >= 102 && this instanceof Character) {
                this.y = 102;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /**
     * Check if object is above ground based on object type.
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } if (this instanceof SmallChicken) {
            return this.y < 295
        } if (this instanceof Endboss) {
            return this.y < 65
        }
        else { return this.y < 102; }
    }

    /**
     * Set upward jump velocity.
     * @returns {void}
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * Set small upward jump velocity.
     * @returns {void}
     */
    smallJump() {
        this.speedY = 15;
    }

    /**
     * Move object right by speed amount.
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Move object left by speed amount.
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Check if time elapsed exceeds threshold in seconds.
     * @param {number} timeToCheck - Timestamp to check against.
     * @param {number} valueToCheckAgainst - Threshold in seconds.
     * @returns {boolean}
     */
    checkTimer(timeToCheck, valueToCheckAgainst) {
        let timePassed = new Date().getTime() - timeToCheck;
        timePassed = timePassed / 1000;
        return timePassed > valueToCheckAgainst
    }

}