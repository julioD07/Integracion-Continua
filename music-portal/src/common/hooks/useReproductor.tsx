import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { pause, play, setCurrentTime, setDuration, setVolume, toggleMute } from "../../store/slices";

export const useReproductor = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();

  const {
    title,
    artist,
    imageUrl,
    src,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
  } = useAppSelector((state) => state.song);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleLoadedData = () => {
      if (audioElement) {
        dispatch(setDuration(audioElement.duration));
        dispatch(setCurrentTime(0));
      }
    };

    const handleTimeUpdate = () => {
      if (audioElement) {
        dispatch(setCurrentTime(audioElement.currentTime));
      }
    };

    const handleError = () => {
      console.error("Error loading audio source");
      dispatch(pause());
    };

    if (audioElement) {
      audioElement.addEventListener("loadeddata", handleLoadedData);
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("error", handleError);
      audioElement.load();
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("loadeddata", handleLoadedData);
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener("error", handleError);
      }
    };
  }, [src, dispatch]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement && isPlaying) {
      audioElement.play();
    }
  }, [src, isPlaying]);

  const handlePlayPause = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        dispatch(pause());
      } else {
        audioElement.play();
        dispatch(play());
      }
    }
  };

  const handleSkipForward = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.currentTime += 10;
      dispatch(setCurrentTime(audioElement.currentTime));
    }
  };

  const handleSkipBackward = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.currentTime -= 10;
      dispatch(setCurrentTime(audioElement.currentTime));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.volume = newVolume;
    }
  };

  const handleMuteToggle = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      dispatch(toggleMute());
      audioElement.muted = !isMuted;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

    return {
        audioRef,
        title,
        artist,
        imageUrl,
        src,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        handlePlayPause,
        handleSkipForward,
        handleSkipBackward,
        handleVolumeChange,
        handleMuteToggle,
        formatTime,
    };
};
