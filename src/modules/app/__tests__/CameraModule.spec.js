import {CameraModule} from '../CameraModule';

const modules = {};

test('CameraModule', () => {
  modules.camera = new CameraModule();
});

describe('CameraModule', () => {
  const cameraModule = new CameraModule();

  test('can be assigned to modules', () => {
    modules.camera = cameraModule;
  });

  test('has the correct default Camera Position', () => {
    expect(cameraModule.camera.position.x).toBeCloseTo(0, 5);
    expect(cameraModule.camera.position.y).toBeCloseTo(0, 5);
    expect(cameraModule.camera.position.z).toBeCloseTo(0, 5);
  });

  const position = { x: 10, y: 20, z: 30 };
  const fov = 40;
  const aspect = 50;
  const near = 60;
  const far = 70;

  const params = {
    position: position,
    fov: fov,
    aspect: aspect,
    near: near,
    far: far
  };

  const customCameraModule = new CameraModule(params);

  test('has the custom Camera Position', () => {
    expect(customCameraModule.camera.position.x).toBeCloseTo(position.x, 5);
    expect(customCameraModule.camera.position.y).toBeCloseTo(position.y, 5);
    expect(customCameraModule.camera.position.z).toBeCloseTo(position.z, 5);
  });

  test('passes a custom fov value', () => {
    expect(customCameraModule.camera.native.fov).toBeCloseTo(fov, 5);
  });

  test('passes a custom aspect value', () => {
    expect(customCameraModule.camera.native.aspect).toBeCloseTo(aspect, 5);
  });

  test('passes a custom near value', () => {
    expect(customCameraModule.camera.native.near).toBeCloseTo(near, 5);
  });

  test('passes a custom far value', () => {
    expect(customCameraModule.camera.native.far).toBeCloseTo(far, 5);
  });
});
