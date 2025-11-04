import React from 'react';

const songs = [
  { id: 1, title: 'Song One', artist: 'Artist One' },
  { id: 2, title: 'Song Two', artist: 'Artist Two' },
  { id: 3, title: 'Song Three', artist: 'Artist Three' },
];

const SongList: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <ul>
        {songs.map((song) => (
          <li key={song.id} className="flex justify-between py-2 border-b last:border-0 border-gray-200">
            <span className="font-semibold text-gray-800">{song.title}</span>
            <span className="text-gray-600">{song.artist}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
