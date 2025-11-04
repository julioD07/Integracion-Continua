import { useAppSelector } from "../store";
import { useEffect } from "react";
import { Reproductor } from "./Reproductor";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const darkMode = useAppSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return <>{children}
  <Reproductor />
  </>;
};
