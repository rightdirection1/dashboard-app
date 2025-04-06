import DashboardButton from "./DashboardButton";
import DashboardActions from "./DashboardActions";
import "./DashboardItem.css";
import { ButtonData } from "@/types/buttonData";

interface Props {
  button: ButtonData;
  onDelete: (id: string) => void;
}

export default function DashboardItem({ button, onDelete }: Props) {
  return (
    <div className="grid-item">
      <DashboardButton button={button} />
      {button.url && <DashboardActions id={button.id} onDelete={onDelete} />}
    </div>
  );
}
