// const windowWidth = document.querySelector('#game').offsetWidth;
// const windowHeight = document.querySelector('#game').offsetHeight;

export default class extends Phaser.Scene{
  constructor() {
    super({key: 'preload'})
  }
  preload() {
    // 背景 -----------------------------
    this.load.spritesheet('background',
      './img/background.png',
      {frameWidth: 560, frameHeight: 272 }
    )

    // 地板 -----------------------------
    this.load.image('ground','./img/ground.png')

    // 玩家 -----------------------------
    this.load.spritesheet('static',
      './img/static.png',
      { frameWidth: 75, frameHeight: 90 }
    )
    this.load.spritesheet('run', 
      './img/run.png',
      { frameWidth: 75, frameHeight: 90 }
    )
    this.load.spritesheet('jump',
      './img/jump.png',
      { frameWidth: 112.5, frameHeight: 90 }
    )
    this.load.spritesheet('thunder', 
      './img/thunder.png',
      { frameWidth: 150, frameHeight: 90 }
    )
    this.load.spritesheet('attack', 
      './img/attack.png',
      { frameWidth: 95, frameHeight: 90 }
    )
    this.load.spritesheet('ko', 
    './img/ko.png',
    { frameWidth: 102, frameHeight: 90 }
  )
    // 敵人 -------------------------------
    this.load.spritesheet('enemy',
      './img/enemy-static.png',
      { frameWidth: 75, frameHeight: 90 }
    )
    this.load.spritesheet('enemy-walk',
      './img/enemy-walk.png',
      { frameWidth: 75, frameHeight: 90 }
    )
    this.load.spritesheet('enemy-attack',
      './img/enemy-attack.png',
      { frameWidth: 75, frameHeight: 90 }
    )
    this.load.spritesheet('enemy-ko',
      './img/enemy-knocked.png',
      { frameWidth: 92, frameHeight: 90 }
    )
  }
  create() {
    this.scene.start('main');
  }
  update() {
  }
}