import { setDarkMode, useAppDispatch, useAppSelector } from "../../store";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.darkMode.darkMode);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!darkMode));
  };

  return (
    <header className="w-full p-4 bg-white shadow-md text-center dark:bg-darkbg">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Music Portal
        </h1>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-md">
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-md flex items-center"
          >
            <BsPersonCircle className="mr-2" />
          </button>
          <button
            className="p-2 rounded-md flex items-center"
            onClick={() => navigate("/register")}
          >
            <FaUserPlus className="mr-2" />
          </button>
          {/* <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-md"
          >
            <Bs0Circle />
          </button> */}
        </div>
      </div>
    </header>
  );
};
