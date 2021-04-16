const initialState = {};

export default function flickerReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        [action.item.title]: {
          ...action.item,
        },
      };
    }
    default:
      return state;
  }
}

//SHOW MOVIES ADDED TO WATCHLIST
export const getWatchlist = (state) => Object.values(state);
