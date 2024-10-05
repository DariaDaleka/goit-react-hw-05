import { Link, useNavigate } from "react-router-dom";
import css from "./NotFoundPage.module.css"; // Импортируйте стили

const NotFoundPage = () => {
  const navigate = useNavigate(); // Для возврата на предыдущую страницу

  const handleGoBack = () => {
    navigate(-1); // Возврат на предыдущую страницу
  };

  return (
    <div className={css.notFoundPage}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <div>
        <button onClick={handleGoBack}>Go Back</button>
        <Link to="/">Go to Home Page</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
