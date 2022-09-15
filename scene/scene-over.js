export default class extends Phaser.Scene{
  constructor() {
    super({key: 'over'})
  }
  create(result) {
    const x = this.game.config.width / 2;
    const y = this.game.config.height / 2;
    const text = result === 'win' ? 'YOU WIN' : 'YOU LOSE';
    const texture = result === 'win' ? 'attack' : 'ko';

    //player
    this.player = this.physics.add.sprite(x ,y - 80, texture).setScale(2.5);
    this.player.body.allowGravity = false

    //提示文字
    this.add.text(x, y + 90, text, {
      fill:'#fff',
      fontFamily: 'Archivo Black',
      fontSize: 70,
    }).setOrigin(0.5)
  }
}