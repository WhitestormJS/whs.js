import {Component} from '@whs/core';
import Events from 'minivents';

const Z_FORWARD_VECTOR = new THREE.Vector3(0, 0, 1);

export default class Character extends Component.Mesh {
  constructor(options) {
    super(options);
    Events(this);

    this.actions = {};
    this._moveOffset = 0;
    this._lookDirectionAngleOffset = 0;
    this._lookDirectionAngle = 0;
  }

  get speed() {
    return this._moveOffset / 100;
  }

  get lookAngle() {
    return this._lookDirectionAngle;
  }

  get lookAngleOffset() {
    return this._lookDirectionAngleOffset;
  }

  build(options) {
    const object = options.model.scene;

    object.traverse(child => {
      child.frustumCulled = false;
    });

    object.scale.setScalar(0.1);

    this.animationMixer = new THREE.AnimationMixer(object);
    this.mapActions(options.actionsMap, options.model.animations);

    const characterGroup = new THREE.Group();
    object.position.set(0, 10, 0);
    characterGroup.add(this.bridge('mesh', object));


    return this.bridge('characterGroup', characterGroup);
  }

  mapActions(actionsMap = {}, animations) {
    for (let key in actionsMap) {
      this.actions[key] = this.animationMixer.clipAction(
        animations.find(clip => clip.name === actionsMap[key])
      );
    }
  }

  async initialize(updateCallback) {
    const native = await this.native;
    console.log('native', this.native);

    updateCallback(clock => {
      this.animationMixer.update(clock.getDelta());

      const moveOffsetVec = Z_FORWARD_VECTOR
        .set(0, 0, 1)
        .applyQuaternion(native.quaternion)
        .setLength(this.speed);

      native.position.add(moveOffsetVec);
      this._lookDirectionAngle += this._lookDirectionAngleOffset;
      native.rotation.y = this._lookDirectionAngle;
    });
  }

  async action(actionName) {
    await this.native;

    const action = this.actions[actionName];
    action.stop();

    for (let fadeAction of Object.values(this.actions)) {
      if (fadeAction.isRunning()) {
        action.crossFadeFrom(fadeAction, 0.3, true);
      }
    }

    action.play();
  }

  async stop(actionName) {
    await this.native;
    this.actions[actionName].stop();
  }

  async setSpeed(speed) {
    this._moveOffset = speed;
  }

  async setLookDirectionAngleOffset(angleOffset) {
    this._lookDirectionAngleOffset = angleOffset;
  }
}
