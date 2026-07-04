import { ImageSource, Sound, Resource, Loader, FontSource } from 'excalibur'

const Resources = {
    Background1: new ImageSource('images/achtergrond1.png'),
    Background2: new ImageSource('images/achtergrond2.png'),
    Gameover: new ImageSource('images/gameover.png'),
    Coin: new ImageSource('images/coin.png'),
    Crate: new ImageSource('images/crate.png'),
    Zombie1: new ImageSource('images/Zombie1.png'),
    Zombie2: new ImageSource('images/Zombie2.png'),
    Ground: new ImageSource('images/ground.png'),
    Mario: new ImageSource('images/mario.png'),
    MarioAttack: new ImageSource('images/mario_attack.png'),
    Platform: new ImageSource('images/platform.png'),
    CoinSound: new Sound('sounds/coin.mp3'),
    PixelFont: new FontSource('PressStart2P-Regular.ttf', 'PressStart')
}

const ResourceLoader = new Loader([
    Resources.Background1,
    Resources.Background2,
    Resources.Gameover,
    Resources.Coin,
    Resources.Crate,
    Resources.Zombie1,
    Resources.Zombie2,
    Resources.Ground,
    Resources.Mario,
    Resources.MarioAttack,
    Resources.Platform,
    Resources.CoinSound,
    Resources.PixelFont
])

export { Resources, ResourceLoader }

