import { ButtonData } from "@/types/buttonData";

export const gridButtons = (buttons: ButtonData[]) => {
  return Array(9)
    .fill(null)
    .map((_, index) => {
      return (
        buttons[index] || {
          id: index + 1,
          color: "#ccc",
          url: "",
          title: "",
        }
      );
    });
};
