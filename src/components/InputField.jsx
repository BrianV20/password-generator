import { useId } from "react";
import "../App.css";

export const InputField = ({ text, type, name, checked, onChange }) => {
  const inputId = useId();

  return (
    <div>
      <input
        type={type}
        name={name}
        checked={checked}
        id={inputId}
        onChange={onChange}
      />
      <label htmlFor={name}>{text}</label>
    </div>
  );
};
