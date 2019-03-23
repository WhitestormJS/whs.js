export default function(state = {
  size: [window.innerWidth, window.innerHeight]
}, action) {
  switch (action.type) {
    case 'CHANGE_SIZE':
      return {
        ...state,
        size: action.payload
      };
    default:
      return state;
  }
}
