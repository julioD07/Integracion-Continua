import { Link } from "react-router-dom";

interface FormComponentProps {
  titulo: string;
  correspondingRoute: string;
  correspondingRouteText: string;
  textLink: string;
  handleForm: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export const FormComponent = ({
  titulo,
  correspondingRoute,
  correspondingRouteText,
  textLink,
  handleForm,
  children,
}: FormComponentProps) => {
  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center animate__animated animate__fadeIn"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-lg shadow-md bg-opacity-90 dark:bg-opacity-90">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            {titulo}
          </h2>
          <form onSubmit={handleForm}>
            {children}
            <br />
            <button
              type="submit"
              className="w-full py-3 bg-buttoncolor text-white rounded-md hover:bg-buttonhover transition-colors"
            >
              {titulo}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            {correspondingRouteText}{" "}
            <Link
              to={correspondingRoute}
              className="text-buttoncolor hover:underline"
            >
              {textLink}
            </Link>
          </p>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            <Link
              to="/"
              className="text-buttoncolor hover:underline"
            >
              Volver al inicio
            </Link>
          </p>
        </div>
      </div>
      <br />
      {/* <Reproductor /> */}
    </>
  );
};
