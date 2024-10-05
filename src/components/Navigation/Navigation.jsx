import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.navLink}>
      <ul className={css.navList}>
        <li>
          <NavLink
            className={({ isActive }) => 
              isActive ? `${css.accent} ${css.active}` : css.accent
            }
            to="/"
            end
            aria-label="Go to home page"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => 
              isActive ? `${css.accent} ${css.active}` : css.accent
            }
            to="/movies"
            aria-label="Go to movies page"
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
