import { useUpload } from "../../common/hooks/useUpload";

export const Upload = () => {
  const {
    values,
    handleClick,
    handleInputChange,
    handleDragOver,
    error,
    handleDrop,
    handleSubmit,
    handleFileChange,
    file,
    fileInputRef,
  } = useUpload();

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Subir Canción</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Título de la canción
        </label>
        <input
          type="text"
          name="songTitle"
          value={values.songTitle}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm dark:bg-white dark:text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Artista</label>
        <input
          type="text"
          name="artist"
          value={values.artist}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm dark:bg-white dark:text-gray-700"
        />
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-4 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer mb-4"
        onClick={handleClick}
      >
        {file ? (
          <p>{file.name}</p>
        ) : (
          <p>Arrastre su archivo MP3 aquí o haga clic para seleccionarlo</p>
        )}
        <input
          type="file"
          accept="audio/mpeg"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {/* Hacemos el boton tipo Block */}
      <button
        onClick={handleSubmit}
        className="block w-full bg-blue-500 text-white font-semibold p-3 rounded-lg mt-4 hover:bg-blue-600"
      >
        Subir
      </button>
    </div>
  );
};
