import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
  FaVolumeMute,
  FaArrowsAlt,
} from "react-icons/fa";
import { useReproductor } from "../common/hooks/useReproductor";
import { useAppDispatch } from "../store";
import { setCurrentTime } from "../store/slices";

export const Reproductor: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    imageUrl,
    title,
    artist,
    handleSkipBackward,
    handleSkipForward,
    isMuted,
    isPlaying,
    handlePlayPause,
    handleMuteToggle,
    handleVolumeChange,
    formatTime,
    volume,
    currentTime,
    duration,
    audioRef,
    src,
  } = useReproductor();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between mt-10">
      <div className="flex items-center mb-4 sm:mb-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-400">{artist}</p>
        </div>
      </div>
      <div className="flex items-center flex-grow justify-center mx-4 mb-4 sm:mb-0">
        <button onClick={handleSkipBackward} className="mx-2">
          <FaBackward />
        </button>
        <button onClick={handlePlayPause} className="mx-2">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleSkipForward} className="mx-2">
          <FaForward />
        </button>
        <div className="flex items-center mx-4 w-full max-w-xs sm:max-w-md">
          <span className="text-xs sm:text-base">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            value={
              isNaN((currentTime / duration) * 100)
                ? 0
                : (currentTime / duration) * 100
            }
            onChange={(e) => {
              const audioElement = audioRef.current;
              if (audioElement) {
                audioElement.currentTime =
                  (parseFloat(e.target.value) / 100) * audioElement.duration;
                dispatch(setCurrentTime(audioElement.currentTime));
              }
            }}
            className="mx-2 w-full"
          />
          <span className="text-xs sm:text-base">{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex items-center">
        <button onClick={handleMuteToggle} className="mx-2">
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          type="range"
          value={volume}
          onChange={handleVolumeChange}
          min="0"
          max="1"
          step="0.01"
          className="mx-2 w-16 sm:w-24"
        />
        <button className="mx-2">
          <FaArrowsAlt />
        </button>
      </div>
      <audio ref={audioRef} src={src} />
    </footer>
  );
};
