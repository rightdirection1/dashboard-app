import React, { memo } from "react";
import DashboardItem from "./DashboardItem";
import { ButtonData } from "@/types/buttonData";
import { gridDashboard } from "@/utils/gridDashboard";
import styles from "./DashboardGrid.module.css";

interface Props {
  buttons: ButtonData[];
  onDelete: (id: string) => void;
}

const DashboardGrid: React.FC<Props> = ({ buttons, onDelete }) => {
  const processedButtons: ButtonData[] = gridDashboard(buttons);

  return (
    <div className={styles.grid}>
      {processedButtons.map((button) => (
        <DashboardItem key={button.id} button={button} onDelete={onDelete} />
      ))}
    </div>
  );
};
export default memo(DashboardGrid);
