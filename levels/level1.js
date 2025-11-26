const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
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
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle()
    ]
);