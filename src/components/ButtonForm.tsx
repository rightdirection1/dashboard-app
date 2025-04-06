import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InputField from "./InputField";
import ColorPicker from "./ColorPicker";
import SubmitButton from "./SubmitButton";
import LoadingIndicator from "./LoadingIndicator";
import "./ButtonForm.css"; // Importing plain CSS file

interface ButtonData {
  title: string;
  color: string;
  url: string;
}

export default function ButtonForm() {
  const [button, setButton] = useState<ButtonData>({
    title: "",
    color: "#000000",
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady || !id) return;

    setLoading(true);
    fetch(`/api/buttons/${id}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          setLoading(false);
          return null;
        }
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data) setButton(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching button data:", error);
        setLoading(false);
      });
  }, [id, router.isReady]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButton({ ...button, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = id && !notFound ? "PUT" : "POST";
    const endpoint =
      id && !notFound ? `/api/buttons/update/${id}` : `/api/buttons/create`;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(button),
      });

      if (!response.ok) throw new Error("Failed to save button");

      router.push("/");
    } catch (error) {
      console.error("Error saving button:", error);
    }
  };

  if (loading) return <LoadingIndicator />;

  return (
    <div className="form-container">
      <h1 className="form-title">{id ? "Edit Button" : "Create New Button"}</h1>
      <form onSubmit={handleSubmit} className="button-form">
        <InputField
          label="Title"
          type="text"
          name="title"
          value={button.title}
          onChange={handleChange}
          required
          placeholder="Enter button title"
        />
        <ColorPicker
          label="Color"
          name="color"
          value={button.color}
          onChange={handleChange}
        />
        <InputField
          label="URL"
          type="text"
          name="url"
          value={button.url}
          onChange={handleChange}
          required
          placeholder="Enter button link"
        />
        <SubmitButton label={id ? "Update" : "Create"} />
      </form>
    </div>
  );
}
