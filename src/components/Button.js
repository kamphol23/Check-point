import "./styling/Button.css";

function Button({ text, onClick, type = "button", style = "primary" }) {
  return (
    <button className={`btn ${style}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
}

export default Button;
