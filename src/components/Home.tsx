import { useState, useCallback } from "react";
import DashboardGrid from "./DashboardGrid";
import { ButtonData } from "@/types/buttonData";
import "./Home.css";

interface HomeProps {
  initialButtons: ButtonData[];
}

export default function Home({ initialButtons }: HomeProps) {
  const [buttons, setButtons] = useState<ButtonData[]>(initialButtons);

  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/buttons/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setButtons((prev) =>
        prev.map((btn) =>
          btn.id === id
            ? { id: id.toString(), color: "#ccc", url: "", title: "" }
            : btn
        )
      );
    } catch (err) {
      console.error("Delete error:", err);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboards</h1>
      <DashboardGrid buttons={buttons} onDelete={handleDelete} />
    </div>
  );
}
