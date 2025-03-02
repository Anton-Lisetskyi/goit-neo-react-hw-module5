import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const Navigation = () => (
  <nav className={css.navigation}>
    <NavLink
      to="/"
      className={({ isActive }) => clsx(css.navLink, isActive && css.active)}
    >
      Home
    </NavLink>
    <NavLink
      to="/movies"
      className={({ isActive }) => clsx(css.navLink, isActive && css.active)}
    >
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
