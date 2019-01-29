import {
  FrontSide,
  BackSide,
  DoubleSide,

  SmoothShading,
  FlatShading,

  NoBlending,
  NormalBlending,
  AdditiveBlending,
  SubtractiveBlending,
  MultiplyBlending,
  CustomBlending,

  NeverDepth,
  AlwaysDepth,
  LessDepth,
  LessEqualDepth,
  GreaterEqualDepth,
  GreaterDepth,
  NotEqualDepth
} from 'three';

const additional = {
  wireframe: {
    wireframe: 'boolean',
    wireframeLinecap: ['butt', 'round', 'square'],
    wireframeLinejoin: ['round', 'bevel', 'miter'],
    wireframeLinewidth: 'number'
  },

  refr: {
    reflectivity: 'number',
    refractionRatio: 'number'
  },

  maps: {
    map: 'texture',
    alphaMap: 'texture',
    envMap: 'texture',
    lightMap: 'texture',
    lightMapIntensity: 'number'
  },

  normal: {
    normalMap: 'texture',
    normalScale: 'number'
  },

  displacement: {
    displacementScale: 'number',
    displacementBias: 'number',
    displacementMap: 'texture'
  },

  emissive: {
    emissive: 'color',
    emissiveMap: 'texture',
    emissiveIntensity: 'number'
  },

  specular: {
    specular: 'color',
    specularMap: 'texture'
  },

  ao: {
    aoMap: 'texture',
    aoMapIntensity: 'number'
  }
}

const add = (origin, ...addv) => {
  return Object.assign(origin, ...addv.map(value => additional[value]))
}

export default {
  any: add({
    side: {FrontSide, BackSide, DoubleSide},
    shading: {SmoothShading, FlatShading},
    blending: {
      NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending
    },
    depthFunc: {
      NeverDepth, AlwaysDepth, LessDepth, LessEqualDepth, GreaterEqualDepth, GreaterDepth, NotEqualDepth
    }
  }, 'wireframe'),

  MeshBasicMaterial: {
    color: 'color',
    lights: 'boolean',
    linewidth: 'number',
    linecap: ['butt', 'round', 'square'],
    linejoin: ['round', 'bevel', 'miter']
  },

  MeshLambertMaterial: add({
    color: 'color',
    skinning: 'boolean',
    morphTargets: 'boolean',
    morphNormals: 'boolean'
  }, 'emissive', 'refr', 'maps', 'normal', 'specular', 'ao'),

  MeshPhongMaterial: add({
    color: 'color',
    skinning: 'boolean',
    morphTargets: 'boolean',
    morphNormals: 'boolean'
  }, 'displacement', 'emissive', 'maps', 'refr', 'specular', 'ao'),

  MeshDepthMaterial: {

  }
  // To be continued...
}
