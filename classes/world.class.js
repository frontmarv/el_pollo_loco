class World {
    character = new Character();
    level = level1;
    healthbar = new HealthBar();
    coinbar = new CoinBar();
    bottlebar = new BottleBar();
    canvas;
    ctx;
    keyboard;
    camera_x;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.setWorld();
        this.draw();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
        this.healthbar.world = this;
        this.coinbar.world = this;
        this.bottlebar.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.isHit();
                    this.healthbar.setPercentageHealth(this.character.healthPoints)
                }
            })
            this.level.coins.forEach((collectedCoin, index) => {
                if (this.character.isColliding(collectedCoin)) {
                    this.level.coins.splice(index, 1);
                    this.coinbar.setPercentageCoin(10);
                }
            })

            this.level.bottles.forEach((bottle, index) => {
                if (this.character.isColliding(bottle)) {
                    this.level.bottles.splice(index, 1);
                    this.bottlebar.setPercentageBottle(100/3);
                }
            })
        }, 100);
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImg(mo);
        }
        mo.drawMovableObject(this.ctx);
        if (mo.otherDirection) {
            this.flipImgBack(mo);
        }
        mo.drawOffsetFrame(this.ctx);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => { this.addToMap(o) });
    }

    flipImg(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImgBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    addFixedObjectsToMap(objects) {
        objects.forEach(object => {
            object.drawFixedObject(this.ctx);
            object.drawOffsetFrame(this.ctx);
        })
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);
        this.addFixedObjectsToMap(this.level.coins);
        this.addFixedObjectsToMap(this.level.bottles);

        // fixed object movement
        this.ctx.translate(-this.camera_x, 0);
        this.healthbar.drawFixedObject(this.ctx);
        this.coinbar.drawFixedObject(this.ctx);
        this.bottlebar.drawFixedObject(this.ctx);
        this.ctx.translate(this.camera_x, 0);
        // until here

        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


}




