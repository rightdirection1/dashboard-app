import React from "react";
import "./ColorPicker.css";

interface ColorPickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  name,
  value,
  onChange,
}) => (
  <div className="form-group">
    <label>{label}</label>
    <input type="color" name={name} value={value} onChange={onChange} />
  </div>
);

export default ColorPicker;
