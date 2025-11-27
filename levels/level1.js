const lvlLength = 2200;
const level1 = new Level(
    [
        new Chicken(lvlLength),
        new Chicken(lvlLength),
        new Chicken(lvlLength),
        new Endboss(lvlLength),
        new SmallChicken(lvlLength),
        new SmallChicken(lvlLength),
        new SmallChicken(lvlLength)
    ],
    [
        new Cloud('../imgs/5_background/layers/4_clouds/1.png')
    ],
    [
        new BackgroundObject('../imgs/5_background/layers/air.png', -700),
        new BackgroundObject('../imgs/5_background/layers/3_third_layer/2.png', -700),
        new BackgroundObject('../imgs/5_background/layers/2_second_layer/2.png', -700),
        new BackgroundObject('../imgs/5_background/layers/1_first_layer/2.png', -700),

        new BackgroundObject('../imgs/5_background/layers/air.png', 0),
        new BackgroundObject('../imgs/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('../imgs/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../imgs/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('../imgs/5_background/layers/air.png', 700),
        new BackgroundObject('../imgs/5_background/layers/3_third_layer/2.png', 700),
        new BackgroundObject('../imgs/5_background/layers/2_second_layer/2.png', 700),
        new BackgroundObject('../imgs/5_background/layers/1_first_layer/2.png', 700),

        new BackgroundObject('../imgs/5_background/layers/air.png', 700 * 2),
        new BackgroundObject('../imgs/5_background/layers/3_third_layer/1.png', 700 * 2),
        new BackgroundObject('../imgs/5_background/layers/2_second_layer/1.png', 700 * 2),
        new BackgroundObject('../imgs/5_background/layers/1_first_layer/1.png', 700 * 2),
        new BackgroundObject('../imgs/5_background/layers/air.png', 700 * 3),
        new BackgroundObject('../imgs/5_background/layers/3_third_layer/2.png', 700 * 3),
        new BackgroundObject('../imgs/5_background/layers/2_second_layer/2.png', 700 * 3),
        new BackgroundObject('../imgs/5_background/layers/1_first_layer/2.png', 700 * 3),
    ],
    [
        new Coin(lvlLength),
        new Coin(lvlLength),
        new Coin(lvlLength),
        new Coin(lvlLength),
        new Coin(lvlLength),
        new Coin(lvlLength),
        new Coin(lvlLength),
        new Coin(lvlLength),
        new Coin(lvlLength),
        new Coin(lvlLength)
    ],
    [
        new Bottle(lvlLength),
        new Bottle(lvlLength),
        new Bottle(lvlLength)
    ],
    lvlLength
);