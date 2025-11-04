import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DarkModeState {
  darkMode: boolean;
}

const initialState: DarkModeState = {
  darkMode: localStorage.getItem('darkMode') === 'true' || true,
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', action.payload.toString());
    },
  },
});

export const darkModeReducer = darkModeSlice.reducer;
export const { setDarkMode } = darkModeSlice.actions;

