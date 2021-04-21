const initialState = {
  personal: {},
  joint: {},
  favorites: {},
  liked: {},
  disliked: {},
};

export default function flickerReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM_PERSONAL": {
      return {
        ...state,
        personal: {
          ...state.personal,
          [action.item.title]: {
            ...action.item,
          },
        },
      };
    }
    case "ADD_ITEM_JOINT": {
      return {
        ...state,
        joint: {
          ...state.joint,
          [action.item.title]: {
            ...action.item,
          },
        },
      };
    }
    case "REMOVE_ITEM_PERSONAL": {
      const copiedState = { ...state, personal: { ...state.personal } };
      delete copiedState.personal[action.item.title];
      return copiedState;
    }

    case "REMOVE_ITEM_JOINT": {
      const copiedState = { ...state, joint: { ...state.joint } };
      delete copiedState.joint[action.item.title];
      return copiedState;
    }

    // case "FAVORITE_ITEM": {
    //   return {
    //     ...state,
    //     [action.item.title]: {
    //       ...action.item,
    //     },
    //   };
    // }
    // case "LIKED_ITEM": {
    //   return {
    //     ...state,
    //     [action.item.title]: {
    //       ...action.item,
    //     },
    //   };
    // }
    // case "DISLIKED_ITEM": {
    //   return {
    //     ...state,
    //     [action.item.title]: {
    //       ...action.item,
    //     },
    //   };
    // }
    default:
      return state;
  }
}

//MOVIES/SHOWS ADDED TO WATCHLIST
export const getPersonalWatchlist = (state) => Object.values(state.personal);

//MOVIES/SHOWS ADDED TO WATCHLIST
export const getJointWatchlist = (state) => Object.values(state.joint);

// //MOVIES/SHOWS ADDED TO FAVORITES
// export const addToFavorites = (state) => Object.values(state);
