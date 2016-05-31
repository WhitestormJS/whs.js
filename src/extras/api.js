import THREE from "three";
import Physijs from "whitestormjs-physijs";
import {loadJson, loadTexture, loadFont} from "../utils/loader";

const extend = Object.assign;

const texture = (url, options) => {
  const texture = loadTexture(url);

  if (options) {

    const opt = Object.assign({}, options, {

      offset: {
        x: 0,
        y: 0
      },

      repeat: {
        x: 1,
        y: 1
      }

    });

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    texture.offset.set(opt.offset.x, opt.offset.y);
    texture.repeat.set(opt.repeat.x, opt.repeat.y);

    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

  }

  return texture;
};

const loadMaterial = (material = {}, isPhysics = true) => {
  if (typeof material.kind !== "string")
    console.error("Type of material is undefined or not a string. @loadMaterial");

  const scope = {
    _type: material.kind,
    _restitution: !isNaN(parseFloat(material.restitution)) ?
      material.restitution : !isNaN(parseFloat(material.rest)) ?
      material.rest : 0.3,
    _friction: !isNaN(parseFloat(material.friction)) ?
      material.friction : !isNaN(parseFloat(material.fri)) ?
      material.fri : 0.8,
  };

  if (material.texture) material.map = texture(material.texture);

  let params = Object.assign({}, material);

  delete params["kind"];

  delete params["friction"];
  delete params["fri"];

  delete params["restitution"];
  delete params["rest"];

  delete params["useCustomMaterial"];
  delete params["useVertexColors"];

  switch (material.kind) {
    case "basic":
      scope._material = new THREE.MeshBasicMaterial(params);
      break;

    case "linebasic":
      scope._material = new THREE.LineBasicMaterial(params);
      break;

    case "linedashed":
      scope._material = new THREE.LineDashedMaterial(params);
      break;

    case "material":
      scope._material = new THREE.Material(params);
      break;

    case "depth":
      scope._material = new THREE.MeshDepthMaterial(params);
      break;

    case "face":
      scope._material = new THREE.MeshFaceMaterial(params);
      break;

    case "lambert":
      scope._material = new THREE.MeshLambertMaterial(params);
      break;

    case "normal":
      scope._material = new THREE.MeshNormalMaterial(params);
      break;

    case "phong":
      scope._material = new THREE.MeshPhongMaterial(params);
      break;

    case "pointcloud":
      scope._material = new THREE.PointCloudMaterial(params);
      break;

    case "rawshader":
      scope._material = new THREE.RawShaderMaterial(params);
      break;

    case "shader":
      scope._material = new THREE.ShaderMaterial(params);
      break;

    case "spritecanvas":
      scope._material = new THREE.SpriteCanvasMaterial(params);
      break;

    case "sprite":
      scope._material = new THREE.SpriteMaterial(params);
      break;
  }

  if (isPhysics)
    scope._materialP = Physijs.createMaterial(
      scope._material,
      scope._friction,
      scope._restitution
    );

  return scope;

};

export {
  loadFont,
  loadJson,
  loadTexture,
  texture,
  loadMaterial
}
