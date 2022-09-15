import ScenePreload from './scene/scene-preload.js';
import SceneMain from './scene/scene-main.js';
import SceneOver from './scene/scene-over.js';

const windowWidth = document.querySelector('#game').offsetWidth;
const windowHeight = document.querySelector('#game').offsetHeight;

const scene = {
  preload: function () {
  },
  create: function () {
  },
  
  update: function() {
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
      gravity: { y: 300 }
      // debug: true
    }
  },
  scene: [ScenePreload, SceneMain, SceneOver]
}

const game = new Phaser.Game(config)
