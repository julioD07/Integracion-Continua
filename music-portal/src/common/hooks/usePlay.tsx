import Swal from "sweetalert2";
import { ResponseDelete, ResponseSongs } from "../../interfaces/Responses";
import { useAppDispatch, useAppSelector } from "../../store";
import { play, setSong } from "../../store/slices";
import { httpAdapter, urlBase } from "../adapters/httpAdapter";

export const usePlay = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const handlePlay = (song: ResponseSongs) => {
    console.log(
      `Playing song: ${song.name} by ${song.artist} with id: ${song.id}`
    );
    // Lógica para reproducir la canción
    console.log(`${urlBase}/api/music/file/${song.id}`);
    dispatch(
      setSong({
        title: song.name,
        artist: song.artist,
        imageUrl: `${
          song.pathImage !== "https://via.placeholder.com/150"
            ? urlBase + "/api/music/image/" + song.pathImage
            : "https://via.placeholder.com/150"
        }`,
        src: `${urlBase}/api/music/file/${song.id}.mp3`,
      })
    );
    dispatch(play());
  };

  const handleDelete = async (song: ResponseSongs) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const resp = await httpAdapter.delete<ResponseDelete>(
        `${urlBase}/api/music/song/${song.id}`,
        {
          Authorization: `Bearer ${user?.token}`,
        }
      );

      if (resp.ok) {
        await Swal.fire({
          title: "Canción Eliminada Correctamente",
          text: "Se ha eliminado la canción correctamente",
          icon: "success",
        });
        location.reload();
      } else {
        await Swal.fire({
          title: "Error",
          text: "Hubo un problema al eliminar la canción",
          icon: "error",
        });
      }
    }
  }

  return {
    handlePlay,
    handleDelete
  };
};
