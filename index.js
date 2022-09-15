// import { Align } from "./alignTest"
import { Align } from './alignTest.js'
const windowWidth = document.querySelector('#game').offsetWidth;
const windowHeight = document.querySelector('#game').offsetHeight;

const scene = {
  preload: function () {
    // 背景
    this.load.spritesheet('background',
      'background.png',
      {frameWidth: 560, frameHeight: 272 }
    )
    this.load.image('ground','ground.png')
  
    // 角色動畫素材
    this.load.spritesheet('static',
      './static.png',
      { frameWidth: 75, frameHeight: 90 }
    )
    this.load.spritesheet('ninja',
      './ninja-static.png',
      { frameWidth: 75, frameHeight: 90 }
    )
    this.load.spritesheet('run', 
      './run.png',
      { frameWidth: 75, frameHeight: 90 }
    )
    this.load.spritesheet('jump',
      './jump.png',
      { frameWidth: 112.5, frameHeight: 90 }
    )
    this.load.spritesheet('thunder', 
      './thunder.png',
      { frameWidth: 150, frameHeight: 97.5 }
    )
  },
  create: function () {
    this.thunderTime = 0
    this.thunderAttack = false
    this.jumpUp = false
    // 背景
    this.bg = this.add.sprite(0, 0, 'background').setOrigin([0] [0]).setScale(3.5)
    this.ground = this.add.sprite(0, windowHeight, 'ground').setScale(2.5);
    this.ground.enableBody = true
    // this.ground.body.setFriction(1)
    this.physics.add.existing(this.ground);
    this.ground.body.immovable = true;
    this.ground.body.moves = false;

    console.log(this.ground.body.friction)
    // this.ground.body.friction.x = 1
    console.log(this.bg)
    // Align.scaleToGameW(game, windowWidth, this.bg, 1)
  
    // 角色
    this.player = this.physics.add.sprite(100, 400, 'static')
      .setCollideWorldBounds(true)

    this.enemy = this.physics.add.sprite(1000, 400, 'ninja')
      .setCollideWorldBounds(true)

    // 物理碰撞
    this.physics.add.collider([this.player,this.ground]);
    this.physics.add.collider([this.enemy, this.ground]);
    
  
    //背景動畫
    this.anims.create({
      key: 'bg-animation',
      frames: this.anims.generateFrameNumbers('background', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    })
    // player動畫
    this.anims.create({
      key: 'static',
      frames: this.anims.generateFrameNumbers('static', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('run', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({
      key: 'jump-up',
      frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({
      key: 'jump-down',
      frames: this.anims.generateFrameNumbers('jump', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({
      key: 'thunder',
      frames: this.anims.generateFrameNumbers('thunder', { start: 0, end: 9 }),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({
      key: 'thunder-repeat',
      frames: this.anims.generateFrameNumbers('thunder', { start: 10, end: 13 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'thunder-output',
      frames: this.anims.generateFrameNumbers('thunder', { start: 14, end: 24 }),
      frameRate: 10,
      repeat: 0
    })
    this.bg.anims.play('bg-animation', true)

    this.anims.create({
      key: 'ninja',
      frames: this.anims.generateFrameNumbers('ninja', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1
    })
    this.enemy.anims.play('ninja', true)
  
    // 控制器
    this.cursors = this.input.keyboard.createCursorKeys()
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  },
  
  update: function() {
    console.log(this.player.body.onFloor())
    if (this.cursors.right.isDown && this.player.body.velocity.y === 0) {
      // 右跑
      this.player.setFlipX(false)
      this.player.setVelocityX(200)
      this.player.anims.play('run', true)
    }else if (this.cursors.left.isDown && this.player.body.velocity.y === 0) {
      // 左跑
      this.player.setFlipX(true)
      this.player.setVelocityX(-200)
      this.player.anims.play('run', true)
    }

    if (this.cursors.up.isDown && this.player.body.velocity.y === 0) {
      // 跳
      this.jumpUp = true
      this.player.setVelocityY(-300)
    }else if(this.player.body.velocity.y < 0) {
      this.player.anims.play('jump-up', true)
    }else if(this.player.body.velocity.y > 0) {
      this.player.anims.play('jump-down', true)
      if(this.player.body.velocity.y === 295 && this.jumpUp === true){
        this.jumpUp = false
      }
    }

    if(this.spaceBar.isDown && this.thunderTime < 60 && this.jumpUp === false) {
      // 千鳥結印
      this.thunderAttack = true
      this.player.setVelocityX(0)
      this.player.anims.play('thunder', true)
      this.thunderStart = false
      this.thunderTime++
    }else if (this.spaceBar.isDown && this.thunderTime >= 60 && this.thunderAttack === true && this.jumpUp === false) {
      // 千鳥續力
      this.thunderTime++
      this.player.setVelocityX(0)
      this.player.anims.play('thunder-repeat', true)
    }else if (this.spaceBar.isUp && this.thunderTime >= 150 && this.thunderAttack === true && this.jumpUp === false) {
      // 千鳥擊出
      this.player.anims.play('thunder-output', true)
      if(this.player.flipX===false){
        this.player.setVelocityX(300)
      }else if(this.player.flipX===true){
        this.player.setVelocityX(-300)
      }
      this.player.on('animationcomplete', (animation) => {
        if (animation.key === 'thunder-output') {
          this.thunderAttack = false
          this.thunderTime = 0
        }
      })
    }
    if (this.cursors.right.isUp && this.cursors.left.isUp && this.player.body.velocity.y === 0 && this.spaceBar.isUp && this.thunderTime < 150) {
      this.player.setVelocityX(0)
      this.player.anims.play('static', true)
    }
  }
}
const config = {
  type: Phaser.AUTO,
  width: windowWidth,
  height: windowHeight,
  pixelArt: true,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true
    }
  },
  scene
}

const game = new Phaser.Game(config)
