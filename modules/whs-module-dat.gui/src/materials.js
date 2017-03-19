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

  light: {
    lightMap: 'texture',
    lightMapIntensity: 'number'
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
  }
}

const add = (origin, ...addv) => {
  console.log(addv.map(value => additional[value]));
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
    color: 'color'
  }, 'emissive', 'refr', 'light'),

  MeshPhongMaterial: add({

  }, 'displacement', 'emissive'),

  MeshDepthMaterial: {

  }
  // To be continued...
}
