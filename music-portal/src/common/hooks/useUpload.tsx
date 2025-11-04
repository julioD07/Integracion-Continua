import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { useAppSelector } from "../../store";
import { useForm } from "./useForm";
import { httpAdapter, urlBase } from "../adapters/httpAdapter";
import { ResponseUploadSong } from "../../interfaces/Responses";
import Swal from "sweetalert2";

interface UploadProps {
  songTitle: string;
  artist: string;
}

export const useUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const user = useAppSelector((state) => state.auth.user);

  const { values, handleInputChange } = useForm<UploadProps>({
    songTitle: "",
    artist: "",
  });

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && droppedFile.type === "audio/mpeg") {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Solo se permiten archivos MP3.");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.type === "audio/mpeg") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Solo se permiten archivos MP3.");
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (file && values.songTitle && values.artist) {
      // Aquí iría la lógica para subir el archivo al servidor junto con los demás datos
      console.log("Archivo subido:", file);
      console.log("Título de la canción:", values.songTitle);
      console.log("Artista:", values.artist);

      const formData = new FormData();
      formData.append("name", values.songTitle);
      formData.append("artist", values.artist);
      formData.append("file", file);

      //? Limpiamos los campos
      const resp = await httpAdapter.postFile<ResponseUploadSong>(
        `${urlBase}/api/music`,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        }
      );

      console.log(resp);

      if (resp.ok) {
        setFile(null);
        setError(null);
        values.songTitle = "";
        values.artist = "";

        Swal.fire({
          title: "Canción subida",
          text: "La canción se ha subido correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    } else {
      setError(
        "Por favor, complete todos los campos y seleccione un archivo MP3 válido."
      );
    }
  };

  return {
    values,
    handleInputChange,
    error,
    handleDragOver,
    handleDrop,
    handleFileChange,
    handleClick,
    handleSubmit,
    fileInputRef,
    file
  };
};
