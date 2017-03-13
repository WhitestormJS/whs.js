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

export default {
  any: {
    side: {FrontSide, BackSide, DoubleSide},
    shading: {SmoothShading, FlatShading},
    blending: {
      NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending
    },
    depthFunc: {
      NeverDepth, AlwaysDepth, LessDepth, LessEqualDepth, GreaterEqualDepth, GreaterDepth, NotEqualDepth
    }
  },
  MeshBasicMaterial: {
    color: 'color',
    lights: 'boolean'
  },
  MeshLambertMaterial: {
    color: 'color'
  }
  // To be continued...
}
