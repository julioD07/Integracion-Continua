import { BsFileEarmarkMusicFill } from "react-icons/bs";
import { FaCog, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";


export const itemsSidebarData = [
    {
        name: "Home",
        icon: <FaHome className="mr-2"/>,
        link: ""
    },
    {
        name: "Subir Canción",
        icon: <BsFileEarmarkMusicFill  className="mr-2"/>,
        link: "upload"
    },
    {
        name: "Portal",
        icon: <FaHome className="mr-2"/>,
        link: "/"
    },
    // {
    //     name: "Profile",
    //     icon: <FaUser className="mr-2"/>,
    //     link: "profile"
    // },
    // {
    //     name: "Settings",
    //     icon: <FaCog className="mr-2"/>,
    //     link: "settings"
    // },
    {
        name: "Logout",
        icon: <FaSignOutAlt className="mr-2"/>,
        link: "",
        function: "handleLogout"
    }
]