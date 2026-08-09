import { useId, useState, type ChangeEvent } from "react";
import styles from "./FloatingField.module.css";

interface FloatingFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  type?: string;
  as?: "input" | "textarea";
  error?: string;
  required?: boolean;
}

export default function FloatingField({
  label,
  name,
  value,
  onChange,
  type = "text",
  as = "input",
  error,
  required = false,
}: FloatingFieldProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(name, e.target.value);
  };

  return (
    <div className={`${styles.field} ${error ? styles.fieldError : ""}`}>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          rows={5}
          required={required}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={styles.textarea}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          required={required}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={styles.input}
        />
      )}
      <label htmlFor={id} className={`${styles.label} ${floated ? styles.labelFloated : ""}`}>
        {label}
      </label>
      <span className={styles.line} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
