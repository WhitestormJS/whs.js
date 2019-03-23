export function changeSize(size) {
  return {
    type: 'CHANGE_SIZE',
    payload: size
  }
};

export function changeRadius(radius) {
  return {
    type: 'CHANGE_RADIUS',
    payload: radius
  }
};


export function changeTeapotValue(value) {
  return {
    type: 'CHANGE_VALUE',
    payload: value
  }
};
