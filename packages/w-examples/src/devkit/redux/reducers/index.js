import {combineReducers} from 'redux';
import appReducer from './appReducer';
import objectsReducer from './objectsReducer';

export default combineReducers({
  app: appReducer,
  objects: objectsReducer
});
