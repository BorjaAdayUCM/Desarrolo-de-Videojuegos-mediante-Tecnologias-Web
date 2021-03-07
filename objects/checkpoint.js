export default class Checkpoint extends Phaser.Physics.Matter.Sprite  {

  constructor(scene, x, y) {

    super(scene.matter.world, x, y, 'checkpointSpriteSheet', 0);
    
    this.crearAnimaciones(scene);

    this.crearFisicas(scene, x, y);

    scene.add.existing(this);
    this.play('animCheckpoint', true);
  }

  crearAnimaciones(scene) {
    scene.anims.create({
      key: 'animCheckpoint',
      frames: scene.anims.generateFrameNumbers('checkpointSpriteSheet', { start: 0, end: 1}),
      frameRate: 5,
      repeat: -1
    });
  }

  crearFisicas(scene, x, y) {

    let M = Phaser.Physics.Matter.Matter;
    let w = this.width;
    let h = this.height;

    this.bodyPropio = M.Bodies.rectangle(0, 0, w, h, {isSensor: true});
    this.finalBody = M.Body.create({
      parts: [this.bodyPropio]
    });

    this.setExistingBody(this.finalBody)
      .setOrigin(0.5, 0.5)
      .setPosition(x, y)
      .setIgnoreGravity(true);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }

}