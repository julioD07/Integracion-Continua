import { SongItemDashboard } from "./SongItemDashboard";
import { usePlay } from "../../common/hooks";
import { useAppSelector } from "../../store";

export interface ResponseSongs {
  id: string;
  name: string;
  artist: string;
  filename: string;
  mimetype: string;
  path: string;
  pathImage: string;
  createdAt: Date;
  userId: string;
}

type SongsGridProps = {
  songs: ResponseSongs[];
};

export const SongsGridDashboard: React.FC<SongsGridProps> = ({ songs }) => {
  const { handlePlay, handleDelete } = usePlay();
  const { user } = useAppSelector((state) => state.auth)
  return (
    <div className="p-4 mb-14">
      <h2 className="text-2xl font-bold mb-4">Canciones Subidas por {user?.fullName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {songs.map((song) => (
          <SongItemDashboard
            key={song.id}
            song={song}
            handlePlay={handlePlay}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};
