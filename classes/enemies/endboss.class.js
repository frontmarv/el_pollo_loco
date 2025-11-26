class Endboss extends MovableObject {
    height = 300;
    width = this.height * 0.86;
    y = 80;
    x = 1000;
    speed = 0.15;
    offset = {
        x: 20,
        y: 50,
        width: 30,
        height: 60
    };
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
        '../imgs/4_enemie_boss_chicken/2_alert/G11png',
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

    constructor() {
        super().loadImage('../imgs/4_enemie_boss_chicken/1_walk/G1.png');
        super.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        this.animateWalking();
    }


    animateWalking() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }

}