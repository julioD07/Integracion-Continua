import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string;
  email: string;
  fullName: string;
}

interface AuthState {
  user: UserState | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
