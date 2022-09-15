const windowWidth = document.querySelector('#game').offsetWidth;
const windowHeight = document.querySelector('#game').offsetHeight;

export default class extends Phaser.Scene{
  constructor() {
    super({key: 'main'})
  } 
  preload() {
  }
  create() {
    this.bigAttack = false
    this.enemyHp = 100
    this.playerHp = 100
    this.thunderTime = 0
    this.thunderAttack = false
    this.jumpUp = false
    this.playerHp = 100
    this.enemyHp = 100
    this.attack = false
    this.koState = true
    this.koTime = 0
    this.thunderkoTime = 0
    this.count = 0
    this.enemyattackTime = 0

    this.enemyAttack = false
    this.enemykoState = true
    this.enemyCount = 0
    this.enemykoTime = 0
    // 血量條 ------------------------------
    // this.bar = new Phaser.GameObjects.Graphics(this.scene)
    // console.log(this.bar)
    // 背景 --------------------------------
    this.bg = this.add.sprite(0, 0, 'background').setOrigin([0] [0]).setScale(3.5)
    this.anims.create({
      key: 'bg-animation',
      frames: this.anims.generateFrameNumbers('background', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    })
    this.bg.anims.play('bg-animation', true)

    // 地板 --------------------------------
    this.ground = this.add.sprite(0, windowHeight, 'ground').setScale(2.5);
    this.ground.enableBody = true
    this.physics.add.existing(this.ground);
    this.ground.body.immovable = true;
    this.ground.body.moves = false;
  
    // 玩家 --------------------------------
    // this.add.text(100, 100, `Sasuke：100`,{
    //   fill: '#000',
    //   fontSize: 30,
    //   fontWeight: 900
    // })
    this.player = this.physics.add.sprite(100, 400, 'static')
      .setCollideWorldBounds(true)
      .setScale(1.4)

    this.player.body.setSize(60, 77)
    
    this.anims.create({
      key: 'static',
      frames: this.anims.generateFrameNumbers('static', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('run', { start: 0, end: 14 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('attack', { start: 0, end: 11 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'ko',
      frames: this.anims.generateFrameNumbers('ko', { start: 0, end: 9 }),
      frameRate: 10,
      repeat: 0
    })
    // 玩家攻擊 (phaser zone)
    this.playerAttackZone = this.add.zone(500, 1300, 24, 24)
    this.physics.add.existing(this.playerAttackZone)
    this.playerAttackZone.body.allowGravity = false

    // 敵人攻擊 (phaser zone)
    this.enemyAttackZone = this.add.zone(500, 1300, 24, 24)
    this.physics.add.existing(this.enemyAttackZone)
    this.enemyAttackZone.body.allowGravity = false


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

    // 敵人 --------------------------------
    this.enemy = this.physics.add.sprite(1000, 400, 'enemy')
      .setCollideWorldBounds(true)
      .setScale(1.4)

    this.enemy.body.setSize(60, 74)
    
    this.anims.create({
      key: 'enemy',
      frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'enemy-walk',
      frames: this.anims.generateFrameNumbers('enemy-walk', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'enemy-attack',
      frames: this.anims.generateFrameNumbers('enemy-attack', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: 0
    })
    
    this.anims.create({
      key: 'enemy-ko',
      frames: this.anims.generateFrameNumbers('enemy-ko', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: 0
    })

    // this.enemy.anims.play('enemy', true)

    // 物理碰撞  ------------------------------
    this.physics.add.collider([this.player,this.ground]);
    this.physics.add.collider([this.enemy, this.ground]);


    // 攻擊擊中敵人
    this.physics.add.overlap(this.playerAttackZone, this.enemy, ()=>{
      if(this.attack) {
        this.koTime ++
        if(this.koTime === 1){
          this.enemyHp -= 10
          if(this.enemyHp <= 0) {
            this.enemyHp = 0
            this.scene.start('over', 'win')
          }
          let enemyBlood = document.querySelector('.enemy-blood')
          enemyBlood.style.width = `${this.enemyHp}%`;
        }
        this.enemy.anims.play('enemy-ko', true)
        this.enemy.setVelocityX(0)
      }
    })

    // 監聽玩家攻擊動畫完畢
    this.player.on('animationcomplete', (animation) => {
      // console.log(animation)
      if(animation.key === 'attack') {
        this.attack = false
      }
    })
    //--------------------------------------------------------------------
    // 千鳥擊中敵人
    this.physics.add.overlap(this.playerAttackZone, this.enemy, ()=>{
      if(this.bigAttack) {
        this.thunderkoTime ++
        // console.log('thunder', this.thunderkoTime)
        if(this.thunderkoTime === 1){
          this.enemyHp -= 50
          if(this.enemyHp <= 0) {
            this.enemyHp = 0
            this.scene.start('over', 'win')
          }
          console.log('ok', this.enemyHp)
          let enemyBlood = document.querySelector('.enemy-blood')
          enemyBlood.style.width = `${this.enemyHp}%`;
        }
        this.enemy.anims.play('enemy-ko', true)
        this.enemy.setVelocityX(0)
      }
    })

    // 監聽玩家攻擊動畫完畢
    this.player.on('animationcomplete', (animation) => {
      // console.log(animation)
      if(animation.key === 'thunder-output') {
        this.bigAttack = false
      }
    })
    //--------------------------------------------------------------------
    // 敵人攻擊擊中玩家
    this.physics.add.overlap(this.enemyAttackZone, this.player, ()=>{
      if(this.enemyAttack) {
        this.enemykoTime ++
        if(this.enemykoTime === 1){
          this.playerHp -= 10
          if(this.playerHp <= 0) {
            this.playerHp = 0
            this.scene.start('over', 'lose')
          }
          let playerBlood = document.querySelector('.player-blood')
          playerBlood.style.width = `${this.playerHp}%`;
        }
        if(this.enemykoTime >= 1) {
          this.player.anims.play('ko', true)
          this.player.setVelocityX(0)
        }
      }
    })

    // 監聽敵人攻擊動畫完畢
    this.enemy.on('animationcomplete', (animation) => {
      if(animation.key === 'enemy-attack') {
        this.enemyAttack = false
      }
    })


    this.cursors = this.input.keyboard.createCursorKeys()
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    // this.cameras.main.setZoom(1.2)
  }
  update() {
    if(this.enemyCount === 0){
      this.enemyattackTime++
      if(this.enemyattackTime > 80){
        this.enemyattackTime = 0
      }
    }
    if(this.koTime != 0) {
      this.count ++ 
      if(this.count > 150) {
        this.koState = false
        this.count = 0
        this.koTime = 0
      }
    }
    if(this.thunderkoTime != 0) {
      this.count ++ 
      // console.log(this.count)
      if(this.count > 150) {
        this.koState = false
        this.count = 0
        this.thunderkoTime = 0
      }
    }
    if(this.enemykoTime !=0) {
      this.enemyCount ++
      if(this.enemyCount > 200) {
        this.enemykoState = false
        this.enemyCount = 0
        this.enemykoTime = 0
      }
    }

    // 玩家動作
    if (this.cursors.right.isDown && this.player.body.velocity.y === 0 && this.cursors.shift.isUp && this.enemykoTime === 0) {
      // 右跑
      this.player.setFlipX(false)
      this.player.setVelocityX(200)
      this.player.anims.play('run', true)
    }else if (this.cursors.left.isDown && this.player.body.velocity.y === 0 && this.cursors.shift.isUp && this.enemykoTime === 0) {
      // 左跑
      this.player.setFlipX(true)
      this.player.setVelocityX(-200)
      this.player.anims.play('run', true)
    }

    
    if (this.cursors.up.isDown && this.player.body.velocity.y === 0 && this.enemykoTime === 0) {
      // 跳
      this.jumpUp = true
      this.player.setVelocityY(-300)
    }else if(this.player.body.velocity.y < 0 && this.enemykoTime === 0) {
      this.player.anims.play('jump-up', true)
    }else if(this.player.body.velocity.y > 0 && this.enemykoTime === 0) {
      this.player.anims.play('jump-down', true)
      if(this.player.body.velocity.y === 295 && this.jumpUp === true){
        this.jumpUp = false
      }
    }
    

    // 招式：千鳥
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
      this.bigAttack = true
      this.player.anims.play('thunder-output', true)
      console.log(this.player.body.velocity.y)
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
    // 攻擊
    if (this.cursors.shift.isDown && this.player.body.velocity.y === 0) {
      this.player.anims.play('attack', true)
      this.attack= true
    }

    // 靜止
    if (this.cursors.right.isUp && this.cursors.left.isUp  && this.cursors.shift.isUp && this.player.body.velocity.y === 0 && this.spaceBar.isUp && this.thunderTime < 150 && this.enemykoTime === 0) {
      this.player.setVelocityX(0)
      this.player.anims.play('static', true)
    }

    // Player zone
    if(this.player.flipX){
      this.playerAttackZone.x = this.player.x - 42
      this.playerAttackZone.y = this.player.y
    }else{
      this.playerAttackZone.x = this.player.x + 42
      this.playerAttackZone.y = this.player.y
    }

    // Enemy zone
    if(this.enemy.flipX){
      this.enemyAttackZone.x = this.enemy.x + 42
      this.enemyAttackZone.y = this.enemy.y
    }else{
      this.enemyAttackZone.x = this.enemy.x - 42
      this.enemyAttackZone.y = this.enemy.y
    }

    // 敵人追擊
    let initAutomata = () => {
      let distance = Math.abs(this.player.body.position.x - this.enemy.body.position.x)
      let judgeDirection = this.player.body.position.x - this.enemy.body.position.x
      if(distance < 50 && this.attack === false && this.koTime === 0 && this.thunderkoTime === 0 && this.enemyCount === 0 && this.enemyattackTime === 80) {
        if(judgeDirection > 0) {
          this.enemy.setFlipX(true)
        }else{
          this.enemy.setFlipX(false)
        }
        this.enemy.setVelocityX(0)
        this.enemy.anims.play('enemy-attack', true)
        this.enemyAttack= true
      }else if(distance >= 400 && this.koTime === 0 && this.thunderkoTime === 0){
        this.enemy.anims.play('enemy', true)
        this.enemy.setVelocityX(0)
      }else if(distance < 400 && distance >= 50 && this.koTime === 0 && this.thunderkoTime === 0) {
        if(this.player.body.position.x > this.enemy.body.position.x){
          this.enemy.setFlipX(true)
          this.enemy.anims.play('enemy-walk', true)
          this.enemy.setVelocityX(150)
        }else if(this.player.body.position.x < this.enemy.body.position.x){
          this.enemy.setFlipX(false)
          this.enemy.anims.play('enemy-walk', true)
          this.enemy.setVelocityX(-150)
        }
      }
    }
    initAutomata()
  }
}