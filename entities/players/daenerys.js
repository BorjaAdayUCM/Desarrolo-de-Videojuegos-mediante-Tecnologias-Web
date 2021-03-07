import Player from "./player.js";
export default class Daenerys extends Player {

  constructor(scene, x, y, maxLife) {

    super(scene, x, y, maxLife, 'daenerysSpriteSheet', 0);
    this.crearAnimaciones(scene);

    this.crearFisicas(scene, x, y);
    this.on('animationcomplete', this.animComplete, this);
    this.on('animationstart', this.animStart, this);

    this.scene.players.push(this);
    scene.add.existing(this);
  }



  crearAnimaciones(scene) {
    scene.anims.create({
      key: "stopDaenerys",
      frames: scene.anims.generateFrameNumbers('daenerysSpriteSheet', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "walkDaenerys",
      frames: scene.anims.generateFrameNumbers('daenerysSpriteSheet', { start: 4, end: 7 }),
      frameRate: 6,
      repeat: -1
    });

    scene.anims.create({
      key: "fallDaenerys",
      frames: scene.anims.generateFrameNumbers('daenerysSpriteSheet', { start: 11, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "jumpDaenerys",
      frames: scene.anims.generateFrameNumbers('daenerysSpriteSheet', { start: 12, end: 12 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "attackDaenerys",
      frames: scene.anims.generateFrameNumbers('daenerysSpriteSheet', { start: 8, end: 10 }),
      frameRate: 8,
      repeat: 0
    });

    scene.anims.create({
      key: "hurtDaenerys",
      frames: scene.anims.generateFrameNumbers('daenerysSpriteSheet', { start: 13, end: 13 }),
      frameRate: 2,
      repeat: 0
    });
  }

  animComplete(animation, frame, sprite) {
    if (animation.key === "hurtDaenerys") this.isHurt = false;
  }

  animStart(animation, frame, sprite) {
    if (!this.mutedEffects) {
      if (animation.key === "attackDaenerys") {
        if(!this.scene.soundAttackDaenerys.isPlaying) this.scene.soundAttackDaenerys.play();
      }
      else if (animation.key === "jumpDaenerys") this.scene.soundJumpDaenerys.play();
      else if (animation.key === "hurtDaenerys") this.scene.soundHurtDaenerys.play();
    }
  }

  eliminarBody() {
    this.body = undefined;
  }

  crearFisicas(scene, x, y) {

    let M = Phaser.Physics.Matter.Matter;
    let w = this.width;
    let h = this.height;

    this.sensores = { bottom: null, hitbox: null };
    this.sensores.hitbox = M.Bodies.rectangle(w * 0.33, 0, 60, 50, { isSensor: true, isStatic: true });
    this.sensores.bottom = M.Bodies.rectangle(0, h * 0.45, 50, 5, { isSensor: true, isStatic: true });
    this.bodyPropio = M.Bodies.rectangle(0, 0, w * 0.47, h * 0.75, { chamfer: { radius: 10 } });
    this.finalBody = M.Body.create({
      parts: [this.bodyPropio, this.sensores.hitbox, this.sensores.bottom]
    });

    this.setExistingBody(this.finalBody)
      .setOrigin(0.5, 0.7)
      .setFriction(0)
      .setFixedRotation()
      .setPosition(x, y);

    this.scene.matter.world.on('beforeupdate', function (event) {
      this.touchingFloor = false;
      this.isBlocked = false;
    }, this);

    this.scene.matter.world.on('collisionactive', function (event) {
      let playerBody = this.bodyPropio;
      let bottom = this.sensores.bottom;
      let hitbox = this.sensores.hitbox;

      for (var i = 0; i < event.pairs.length; i++) {
        let bodyA = event.pairs[i].bodyA;
        let bodyB = event.pairs[i].bodyB;
        if ((bodyA === bottom && !bodyB.isSensor) || (bodyB === bottom && !bodyA.isSensor)) this.touchingFloor = true;
        if (bodyA === hitbox && !this.scene.esLanza(bodyB) && !this.scene.esEnemigo(bodyB) || bodyB === hitbox && !this.scene.esLanza(bodyA) && !this.scene.esEnemigo(bodyA)) this.isBlocked = true;
      }
    }, this);
  }

  playAttack() {
    this.play("attackDaenerys", true);
  }

  playStop() {
    this.play("stopDaenerys", true);
  }

  playWalk() {
    this.play("walkDaenerys", true);
  }

  playJump() {
    this.play("jumpDaenerys", true);

  }

  playFall() {
    this.play("fallDaenerys", true);
  }

  playHurt() {
    this.isHurt = true;
    this.play("hurtDaenerys", true);
  }
}