import "./styling/Button.css";

function Button({ onClick, type = "button", style = "primary", children }) {
  return (
    <button className={`btn ${style}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default Button;
