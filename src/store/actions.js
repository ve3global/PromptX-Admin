export const increment = () => {
  return {
    type: "INCREMENT",
  };
};
export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};
export const updateSettingsData = (payload) => {
  return {
    type: "UPDATE_SETTINGS",
    payload,
  };
};
export const updateUserData = (payload) => {
  return {
    type: "SET_USER",
    payload,
  };
};
