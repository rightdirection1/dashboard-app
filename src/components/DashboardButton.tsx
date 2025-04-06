"use client";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { ButtonData } from "@/types/buttonData";

interface Props {
  button: ButtonData;
}

export default function DashboardButton({ button }: Props) {
  const router = useRouter();
  const navigateDashboard = () => {
    if (button.url) {
      let url = button.url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
      }
      window.open(url, "_blank");
    } else {
      const path =
        button.title === "" && button.url === ""
          ? `/create`
          : `/edit/${button.id}`;
      router.push(path);
    }
  };

  return (
    <button
      className="dashboard-button"
      style={{ backgroundColor: button.color }}
      onClick={() => navigateDashboard()}
    >
      {button.url ? (
        <span className="button-title">{button.title}</span>
      ) : (
        <div className="empty-slot">
          <FaPlus size={20} />
        </div>
      )}
    </button>
  );
}
