import { FaPlay, FaTimes } from "react-icons/fa";
import { urlBase } from "../../common/adapters/httpAdapter";
import { ResponseSongs } from "./SongGridDashboard";

interface SongItemDashboardProps {
  song: ResponseSongs;
  handlePlay: (song: ResponseSongs) => void;
  handleDelete: (songId: ResponseSongs) => void;
}

export const SongItemDashboard = ({ song, handlePlay, handleDelete }: SongItemDashboardProps) => {
  return (
    <div key={song.id} className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => handleDelete(song)}
        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
      >
        <FaTimes />
      </button>
      <img
        src={`${
          song.pathImage !== "https://via.placeholder.com/150"
            ? urlBase + "/api/music/image/" + song.pathImage
            : "https://via.placeholder.com/150"
        }`}
        alt={song.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {song.name}
        </h3>
        <p className="text-gray-700 dark:text-gray-400">{song.artist}</p>
        <button
          onClick={() => handlePlay(song)}
          className="mt-4 flex items-center justify-center w-full py-2 bg-buttoncolor text-white rounded-md hover:bg-buttonhover transition-colors"
        >
          <FaPlay className="mr-2" />
          Play
        </button>
      </div>
    </div>
  );
};
