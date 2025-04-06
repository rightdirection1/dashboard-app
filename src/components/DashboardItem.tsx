import DashboardButton from "./DashboardButton";
import DashboardActions from "./DashboardActions";
import { ButtonData } from "@/types/buttonData";
import styles from "./DashboardItem.module.css";

interface Props {
  button: ButtonData;
  onDelete: (id: string) => void;
}

export default function DashboardItem({ button, onDelete }: Props) {
  return (
    <div className={styles.gridItem}>
      <DashboardButton button={button} />
      {button.url && <DashboardActions id={button.id} onDelete={onDelete} />}
    </div>
  );
}
