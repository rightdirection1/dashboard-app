import { ButtonData } from "@/types/buttonData";

export const gridDashboard = (dashboards: ButtonData[]) => {
  return Array(9)
    .fill(null)
    .map((_, index) => {
      return (
        dashboards[index] || {
          id: index + 1,
          color: "#ccc",
          url: "",
          title: "",
        }
      );
    });
};
