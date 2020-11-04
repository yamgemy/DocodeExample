import { Animated } from 'react-native';

const initialState = {
  canScroll: false,
  snappedHighest: false,
  _deltaY: new Animated.Value(0), //was never set... redux manages it automatically???
};
//returns a new state as a new js object
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETDELTAY': //never called
      return { ...state, _deltaY: action.deltaY };
    case 'SETSCROLLABILITY':
      return { ...state, canScroll: action.scrollBoolean };
    case 'SETSNNAPPEDHIGHEST':
      return { ...state, snappedHighest: action.isSnappedHighest };
    default:
      return state;
  }
};
