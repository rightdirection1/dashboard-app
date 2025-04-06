import { useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./DashboardActions.module.css";

interface Props {
  id: string;
  onDelete: (id: string) => void;
}

export default function DashboardActions({ id, onDelete }: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleDelete = () => {
    onDelete(id);
    setShowPopup(false);
    setSuccessMessage("Dashboard deleted successfully!");
  };

  return (
    <div className={styles["button-actions"]}>
      <Link href={`/edit/${id}`}>
        <button className={styles["edit-button"]}>
          <FaEdit />
        </button>
      </Link>

      <button
        className={styles["delete-button"]}
        onClick={() => setShowPopup(true)}
      >
        <FaTrash />
      </button>

      {showPopup && (
        <div className={styles.popup}>
          <p>Are you sure you want to delete this dashboard?</p>
          <div className={styles["popup-actions"]}>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setShowPopup(false)}>No</button>
          </div>
        </div>
      )}

      {successMessage && (
        <div className={styles["success-message"]}>{successMessage}</div>
      )}
    </div>
  );
}
