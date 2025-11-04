import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const song = {
    title: 'Sample Song',
    artist: 'Sample Artist',
    src: 'https://juliod07.github.io/music-portal/audio/Cancion.mp3',
  };

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10; // Avanzar 10 segundos
    }
  };

  const handleSkipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10; // Retroceder 10 segundos
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <footer className="fixed bottom-0 w-full p-4 bg-white shadow-md text-center dark:bg-darkbg">
      <div className="flex flex-col items-center">
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{song.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">{song.artist}</p>
        </div>
        <div className="flex items-center space-x-4 mb-2">
          <button onClick={handleSkipBackward} className="bg-buttoncolor text-white py-2 px-4 rounded-md hover:bg-buttonhover">
            <FaBackward />
          </button>
          <button onClick={handlePlayPause} className="bg-buttoncolor text-white py-2 px-4 rounded-md hover:bg-buttonhover">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handleSkipForward} className="bg-buttoncolor text-white py-2 px-4 rounded-md hover:bg-buttonhover">
            <FaForward />
          </button>
        </div>
        <div className="w-full max-w-lg flex items-center space-x-2">
          <span className="text-gray-600 dark:text-gray-400">{formatTime(currentTime)}</span>
          <input
            type="range"
            value={progress}
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
              }
            }}
            className="w-full"
          />
          <span className="text-gray-600 dark:text-gray-400">{formatTime(duration)}</span>
        </div>
        <audio ref={audioRef} src={song.src} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-2">© 2024 Music Portal. All rights reserved.</p>
    </footer>
  );
};
