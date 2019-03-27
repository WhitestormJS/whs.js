import * as TWEEN from '@tweenjs/tween.js';

export default class CharacterCameraModule {
  constructor(cameraComponent) {
    this.bridges = {
      characterGroup: async (characterGroup) => {
        const camera = await cameraComponent.native;
        // camera.position.set(0, 0, 0);
        camera.matrix.identity();
        camera.matrix.decompose(camera.position, camera.quaternion, camera.scale);
        // camera.updateMatrix();

        const cameraWrapper = new THREE.Group();

        cameraWrapper.position.set(6, 25, -25); // 6, 25, -25
        cameraWrapper.isCamera = true; // HACK: lookAt
        cameraWrapper.lookAt(new THREE.Vector3(5, 18, 0));
        cameraWrapper.add(camera);

        characterGroup.add(cameraWrapper);

        const character = this.character;

        const positionTween = new TWEEN.Tween(camera.position).to({
            get x() {
              return -character.lookAngleOffset * 2;
            },
            y: 0,
            get z() {
              return character.speed * 10;
            }
          }, 600)
          .easing(TWEEN.Easing.Quadratic.Out);

        const rotationTween = new TWEEN.Tween(camera.rotation).to({
            x: 0,
            get y() {
              return -character.lookAngleOffset * 2;
            },
            z: 0
          }, 600)
          .easing(TWEEN.Easing.Quadratic.Out);

        character.on('run', () => positionTween.start());
        character.on('run/stop', () => positionTween.start());
        character.on('turn', () => rotationTween.start());
        character.on('turn/stop', () => rotationTween.start());

        return characterGroup;
      }
    }
  }

  setup(character, {manager}) {
    this.character = character;
    // const native = await character.native;

  }
}
