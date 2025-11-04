import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import { logoutUser, useAppDispatch } from "../../store";
import { itemsSidebarData } from "./itemsData";

export const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      text: "Has cerrado sesión exitosamente",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-darkbg">
        <div className="flex flex-grow">
          <button
            onClick={toggleSidebar}
            className={`p-4 text-2xl focus:outline-none fixed top-0 left-0 z-20 transition-colors duration-300`}
          >
            <FaBars />
          </button>
          <aside
            className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-transform transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } w-64 z-10`}
          >
            <div className="p-4 text-2xl font-bold text-center border-b border-gray-200 dark:border-gray-700">
              Dashboard
            </div>
            <nav className="mt-6">
              <ul>
                {
                  //? Aqui se puede hacer un map de items para mostrar los items del sidebar
                  itemsSidebarData.map((item, index) => (
                    <li className="mb-2" key={index}>
                      <Link
                        to={item.link}
                        className="flex items-center p-2 pl-6 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        onClick={
                          item.function === "handleLogout"
                            ? handleLogout
                            : () => {}
                        }
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </nav>
          </aside>
          <main
            className={`flex-grow p-8 pt-16 transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-0"
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
      {/* <Reproductor /> */}
    </>
  );
};
