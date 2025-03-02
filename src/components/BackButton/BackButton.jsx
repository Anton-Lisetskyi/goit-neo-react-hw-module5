import css from "./BackButton.module.css";

function BackButton({ onClick }) {
  return (
    <button className={css.backButton} onClick={onClick}>
      <span className={css.arrow}>←</span> Go back
    </button>
  );
}

export default BackButton;
