import { useEffect, useState } from "react";
import { httpAdapter, urlBase } from "../../common/adapters/httpAdapter";
import { ResponseSongs } from "../dashboard/SongGridDashboard";
import { SongItem } from "./SongItem";
import { usePlay } from "../../common/hooks";

export const SongGrid = () => {
  const [songs, setSongs] = useState<ResponseSongs[]>([]);
  const { handlePlay } = usePlay();

  useEffect(() => {
    const fetchSongs = async () => {
      // Lógica para obtener las canciones
      const resp = await httpAdapter.get<ResponseSongs[]>(
        `${urlBase}/api/music/songs`
      );
      if (resp.length > 0 && Array.isArray(resp)) {
        setSongs(resp);
      }
    };
    fetchSongs();
  }, []);

  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {songs.map((song) => (
        <SongItem key={song.id} song={song} handlePlay={handlePlay} />
      ))}
    </div>
  );
};
