// SubmitButton.tsx
import React from "react";
import styles from "./SubmitButton.module.css";

interface SubmitButtonProps {
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => (
  <button type="submit" className={styles["submit-button"]}>
    {label}
  </button>
);

export default SubmitButton;
