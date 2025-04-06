// SubmitButton.tsx
import React from "react";
import "./SubmitButton.css";

interface SubmitButtonProps {
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => (
  <button type="submit" className="submit-button">
    {label}
  </button>
);

export default SubmitButton;
