import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appAPI";

export const userSlice = createSlice({
  name: "user",
  initialState: {newMessages:{}},
  reducers: {
    addNotifications: (state, { payload }) => {
      console.log({payload})
      if (state.newMessages[payload]) {
        state.newMessages[payload] = state.newMessages[payload] + 1;
        console.log("payload (if)>>>", [payload])
      } else {
        state.newMessages[payload] = 1;
        console.log("payload (else)>>>", [payload])
      }
    },
    resetNotifications: (state, { payload = '' }) => {
      delete state.newMessages[payload];
    },
  },

  extraReducers: (builder) => {
    //save user after signup
    builder.addMatcher(
      appApi.endpoints.signupUser.matchFulfilled,
      (state, { payload }) => payload
    );
    //save user after login
    builder.addMatcher(
      appApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => payload
    );
    //logout, delete user session
    builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
  },
});

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;
