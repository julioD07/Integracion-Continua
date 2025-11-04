import { Header, SongGrid } from "../components";

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-darkbg text-gray-900 dark:text-gray-100 animate__animated animate__fadeIn">
      <Header />
      <main className="w-full max-w-5xl p-4 flex-grow">
        <SongGrid />
      </main>
      {/* <Footer /> */}
      {/* <Reproductor /> */}
    </div>
  );
};
