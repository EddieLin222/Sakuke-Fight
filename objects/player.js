export default class extends Phaser.Physics.Arcade.Sprite {
    health = 10;
  
    constructor(scene, params = {}) {
      const {
        x = 400, y = 400,
      } = params;
  
      super(scene, x, y, 'static');
  
      // 將人物加入至場景並加入物理系統
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      // 設定人物縮放、碰撞箱尺寸、碰撞反彈、世界邊界碰撞
      this.setScale(0.3)
        .setSize(220, 210)
        .setBounce(0.2)
        .setCollideWorldBounds(true);
  
      // 播放動畫
      this.play('cat-work');
  
      this.scene = scene;
    }
  
    preUpdate(time, delta) {
      super.preUpdate(time, delta);
    }
  }