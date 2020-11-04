const initialState = { payload: {}, error: null };
//returns a new state as a new js object
export const reducer = (state = initialState, action) => {
  const newState = { ...state };//copy
  return newState;
};
