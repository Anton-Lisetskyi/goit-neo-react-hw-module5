import css from "./Error.module.css";

const Error = ({ message }) => {
  return <div className={css.error}>{message}</div>;
};

export default Error;
