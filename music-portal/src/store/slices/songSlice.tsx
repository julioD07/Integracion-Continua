// src/redux/songSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SongState {
  title: string;
  artist: string;
  imageUrl: string;
  src: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
}

interface SetSongPayload {
  title: string;
  artist: string;
  imageUrl: string;
  src: string;
}

const initialState: SongState = {
  title: 'Sample Song',
  artist: 'Sample Artist',
  imageUrl: 'https://via.placeholder.com/150',
  src: 'http://localhost:5173/audio/Cancion.mp3',
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
};


const songSlice = createSlice({
  name: 'song',
  initialState, 
  reducers: {
    setSong(state, action: PayloadAction<SetSongPayload>) {
        state.title = action.payload.title;
        state.artist = action.payload.artist;
        state.imageUrl = action.payload.imageUrl;
        state.src = action.payload.src;
    },
    play(state) {
        state.isPlaying = true;
    },
    pause(state) {
        state.isPlaying = false;
    },
    setCurrentTime(state, action: PayloadAction<number>) {
        state.currentTime = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
        state.duration = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
        state.volume = action.payload;
    },
    toggleMute(state) {
        state.isMuted = !state.isMuted;
    }
  },
});

export const { setSong, play, pause, setCurrentTime, setDuration, setVolume, toggleMute } = songSlice.actions;

export const songReducer = songSlice.reducer;
