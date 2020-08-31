import * as ActionType from "./types";

export const setUser = (user) => {
  return {
    type: ActionType.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const clearUser = () => {
  return {
    type:ActionType.CLEAR_USER
  }
};


/* channel actions */
export const setCurrentChannel = (channel)=>{
  return {
    type:ActionType.SET_CURRENT_CHANNEL,
    payload:{
      currentChannel:channel
    }
  }
}

export const clearCurrentChannel = () => {
  return {
    type:ActionType.CLEAR_CURRENT_CHANNEL
  }
};