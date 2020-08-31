import * as ActionType from "./../actions/types";
import { combineReducers } from "redux";
const initialUserState = {
  currentUser: null,
  isLoading: true,
};
const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        ...{
          currentUser: action.payload.currentUser,
          isLoading: false,
        },
      };
    case ActionType.CLEAR_USER:
      return {
        ...initialUserState,
        isLoading: false,
      };
    default:
      return state;
  }
};
const initialChannelState = {
  currentChannel: null,
};
const channel_reducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_CHANNEL:
      return {
        ...state,
        ...{
          currentChannel: action.payload.currentChannel,
        },
      };
    case ActionType.CLEAR_CURRENT_CHANNEL:
      return {
        ...initialChannelState,
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer,
});
export default rootReducer;
