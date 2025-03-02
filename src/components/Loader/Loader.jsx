import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => (
  <div className={css.loadercontainer}>
    <ClipLoader size={50} color="#36d7b7" />
  </div>
);

export default Loader;
