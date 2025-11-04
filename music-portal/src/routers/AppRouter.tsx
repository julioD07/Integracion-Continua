import { createHashRouter } from "react-router-dom";
import { Dashboard, Home, Login, Register, Upload } from "../pages";
import { DashboardLayout, ProtectedRoute } from "../components";


export const router = createHashRouter([
  {
    path: "/", // Ruta de la página principal
    element: <Home />, // Componente que se renderizará
  },
  {
    path: "/login", // Ruta de la página de login
    element: <Login />, // Componente que se renderizará
  },
  {
    path: "/register", // Ruta de la página de registro
    element: <Register />, // Componente que se renderizará
  },
  {
    path: "/dashboard", // Ruta de la página de dashboard
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ), // Componente que se renderizará
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "upload",
        element: <Upload />,
      },
      {
        path: "profile",
        element: <h1>Perfil</h1>,
      },
      {
        path: "settings",
        element: <h1>Configuración</h1>,
      }
    ],
  },
]);
