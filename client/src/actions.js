export const addItemPersonal = (item) => {
  return {
    type: "ADD_ITEM_PERSONAL",
    item,
  };
};

export const addItemJoint = (item) => {
  return {
    type: "ADD_ITEM_JOINT",
    item,
  };
};

export const removeItemPersonal = (item) => ({
  type: "REMOVE_ITEM_PERSONAL",
  item,
});

export const removeItemJoint = (item) => ({
  type: "REMOVE_ITEM_JOINT",
  item,
});

// export const favoriteItem = (item) => ({
//   type: "FAVORITE_ITEM",
//   item,
// });

// export const likedItem = (item) => ({
//   type: "LIKED_ITEM",
//   item,
// });

// export const dislikedItem = (item) => ({
//   type: "DISLIKED_ITEM",
//   item,
// });
