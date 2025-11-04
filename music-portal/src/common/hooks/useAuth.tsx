import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logoutUser, useAppDispatch, useAppSelector } from "../../store";
import { validateToken } from "../adapters/validateToken";

export const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (user && user.token) {
        const isValid = await validateToken(user.token);
        if (!isValid) {
          dispatch(logoutUser());
          Swal.fire({
            icon: "warning",
            title: "Sesión Expirada",
            text: "Tu sesión ha expirado. Por favor, inicia sesión de nuevo.",
          });
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    checkToken();
  }, [user, dispatch, navigate]);

  return user;
};
