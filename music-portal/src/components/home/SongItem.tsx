import { FaCirclePlay } from "react-icons/fa6";
import { urlBase } from "../../common/adapters/httpAdapter";
import { ResponseSongs } from "../dashboard/SongGridDashboard";

interface SongItemProps {
    song: ResponseSongs;
    handlePlay: (song: ResponseSongs) => void;
}

export const SongItem = ({handlePlay, song}: SongItemProps) => {

  console.log(song);

  return (
    <>
         <div
          key={song.id}
          className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg"
        >
          <img
            src={`${urlBase}/api/music/image/${song.pathImage}`}
            alt={song.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {song.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{song.artist}</p>
          <button
            className="mt-4 bg-buttoncolor text-white py-2 px-4 rounded-md hover:bg-buttonhover"
            aria-label={`Reproducir ${song.name} de ${song.artist}`}
            onClick={() => handlePlay(song)}
          >
            <FaCirclePlay />
          </button>
        </div>
    </>
  )
}
