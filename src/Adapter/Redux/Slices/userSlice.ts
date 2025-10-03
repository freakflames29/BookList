import { SignInSuccessResponse } from '@react-native-google-signin/google-signin';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: SignInSuccessResponse | undefined;
}
const initialState: UserState = {
  user: undefined,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: state => {
      state.user = undefined;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
