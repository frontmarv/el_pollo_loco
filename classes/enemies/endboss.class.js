class Endboss extends MovableObject {
    endbossDefeated = false;
    world;
    IMAGES_WALKING = [
        '../imgs/4_enemie_boss_chicken/1_walk/G1.png',
        '../imgs/4_enemie_boss_chicken/1_walk/G2.png',
        '../imgs/4_enemie_boss_chicken/1_walk/G3.png',
        '../imgs/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        '../imgs/4_enemie_boss_chicken/2_alert/G5.png',
        '../imgs/4_enemie_boss_chicken/2_alert/G6.png',
        '../imgs/4_enemie_boss_chicken/2_alert/G7.png',
        '../imgs/4_enemie_boss_chicken/2_alert/G8.png',
        '../imgs/4_enemie_boss_chicken/2_alert/G9.png',
        '../imgs/4_enemie_boss_chicken/2_alert/G10.png',
        '../imgs/4_enemie_boss_chicken/2_alert/G11.png',
        '../imgs/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        '../imgs/4_enemie_boss_chicken/3_attack/G13.png',
        '../imgs/4_enemie_boss_chicken/3_attack/G14.png',
        '../imgs/4_enemie_boss_chicken/3_attack/G15.png',
        '../imgs/4_enemie_boss_chicken/3_attack/G16.png',
        '../imgs/4_enemie_boss_chicken/3_attack/G17.png',
        '../imgs/4_enemie_boss_chicken/3_attack/G18.png',
        '../imgs/4_enemie_boss_chicken/3_attack/G19.png',
        '../imgs/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        '../imgs/4_enemie_boss_chicken/4_hurt/G21.png',
        '../imgs/4_enemie_boss_chicken/4_hurt/G22.png',
        '../imgs/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        '../imgs/4_enemie_boss_chicken/5_dead/G24.png',
        '../imgs/4_enemie_boss_chicken/5_dead/G25.png',
        '../imgs/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor(lvlLength) {
        super().loadImage('../imgs/4_enemie_boss_chicken/2_alert/G5.png');
        super.loadImages(this.IMAGES_WALKING);
        super.loadImages(this.IMAGES_ALERT);
        super.loadImages(this.IMAGES_ATTACK);
        super.loadImages(this.IMAGES_DEAD);
        super.loadImages(this.IMAGES_HURT);
        this.height = 300;
        this.width = this.height * 0.86;
        this.y = 80;
        // this.x = 200;
        this.x = lvlLength - 200;
        this.speed = 0.15;
        this.offset = {
            x: 20,
            y: 50,
            width: 30,
            height: 60
        };
        this.healthPoints = 25;
        this.sounds = {
            hurt: SoundManager.register(new Audio('../audio/enemies/endboss-hurt.mp3')),
            attack: SoundManager.register(new Audio('../audio/enemies/endboss-attack.mp3')),
            dying: SoundManager.register(new Audio('../audio/enemies/chicken-dying.mp3'))
        };
        this.animate();
    }

    animate() {


        // wenn character x - 500 entfernt ist, dann alert
        // auf character zubewegen
        // solange zubewegen bis charakter noch 150 entfernt ist
        // playAttack
        // 2 sec in andere richtung laufen
        // loop von vorne
        this.endbossAnimateInterval = setInterval(() => {
            this.animateAlert();
            // if (this.isDead) {
            //     this.playDead();
            //     clearInterval(this.endbossAnimateInterval);
            // } else if (this.isHurt()) {
            //     this.playHurt();
            // }
            // else {
            //     this.animateWalking();
            // }
        }, 250);
    }

    animateWalking() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    animateAlert() {
        this.playAnimation(this.IMAGES_ALERT);
    }

    playHurt() {
        this.sounds.hurt.play();
        this.playAnimation(this.IMAGES_HURT);
    }

    playAttack() {
        this.sounds.attack.play();
        setTimeout(() => {
            this.playAnimation(this.IMAGES_ATTACK);
        }, 500);
    }

    playDead() {

        this.sounds.dying.play();
        this.playAnimation(this.IMAGES_DEAD);
        this.endbossDefeated = true;


    }



    // getXCoordinatesEndboss() {
    //     return this.x
    // }

    // getYCoordinatesEndboss() {
    //     return this.y
    // }
}