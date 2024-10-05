import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.wrapp}>
      <h1 className={s.title}>404 - PAGE NOT FOUND</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotFoundPage;