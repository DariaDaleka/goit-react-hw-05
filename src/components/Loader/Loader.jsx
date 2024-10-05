import { Oval } from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader = () => (
  <div className={s.load}>
    <Oval
      visible={true}
      height={50}
      width={50}
      color="blue"
      ariaLabel="oval-loading"
      secondaryColor="lightblue"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  </div>
);

export default Loader;