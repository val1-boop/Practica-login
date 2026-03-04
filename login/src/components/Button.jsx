function Button({ children, onClick, type = "button", className = "" }) {

  return (
    <button
      type={type}
      className={`btn btn-primary ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;