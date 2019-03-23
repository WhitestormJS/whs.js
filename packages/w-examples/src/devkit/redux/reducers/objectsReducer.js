export default function(state = {
  sphereRadius: 1,
  teapotValue: 0
}, action) {
  switch (action.type) {
    case 'CHANGE_RADIUS':
      return {
        ...state,
        sphereRadius: action.payload
      };
    case 'CHANGE_VALUE':
      return {
        ...state,
        teapotValue: action.payload
      };
    default:
      return state;
  }
}
