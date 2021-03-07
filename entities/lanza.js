
export default class Lanza extends Phaser.Physics.Matter.Sprite {
    
    constructor(scene, x, y, dir) {
        
      super(scene.matter.world, x, y, 'lanzaSprite');
      this.speed = 3.5;
      this.dir = dir;
      
      this.crearFisicas(scene, x, y, this.dir);
      this.scene.lanzas.push(this);
      scene.add.existing(this);
    }

    crearFisicas(scene, x, y, dir) {

      let M = Phaser.Physics.Matter.Matter;
      let h = this.width;
      let w = this.height;

      this.bodyPropio = M.Bodies.rectangle(0, 0, 96, 16, { isSensor: true, isStatic: true});
      this.finalBody = M.Body.create({
        parts: [this.bodyPropio]
      });

      this.setExistingBody(this.finalBody)
      .setOrigin(0.5, 0.4)
      .setFriction(0)
      .setFixedRotation()
      .setPosition(x, y)
      .setIgnoreGravity(true);

      if(!this.dir) this.flipX = true;
    }

    preUpdate(time, delta) {
      super.preUpdate(time, delta);
      if(this.dir) this.setVelocityX(this.speed);
      else this.setVelocityX(-this.speed);
    }
}