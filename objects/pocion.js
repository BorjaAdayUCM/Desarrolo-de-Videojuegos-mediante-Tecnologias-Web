export default class Pocion extends Phaser.Physics.Matter.Sprite  {

  constructor(scene, x, y, spriteSheet, num) {

    super(scene.matter.world, x, y, spriteSheet, num);

    if(spriteSheet === 'pocionEscudoSpriteSheet') this.tipoPocion = 'escudo';
    else if(spriteSheet === 'pocionSaltoSpriteSheet') this.tipoPocion = 'salto';
    else if(spriteSheet === 'pocionVidaSpriteSheet') this.tipoPocion = 'vida';

    this.spriteSheet = spriteSheet;
    
    this.crearAnimaciones(scene);

    this.crearFisicas(scene, x, y);

    scene.add.existing(this);
    this.play('animacion' + this.tipoPocion, true);
  }

  crearAnimaciones(scene) {
    scene.anims.create({
      key: 'animacion' + this.tipoPocion,
      frames: scene.anims.generateFrameNumbers(this.spriteSheet, { start: 0, end: 3}),
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