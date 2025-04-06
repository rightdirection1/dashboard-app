import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InputField from "./InputField";
import ColorPicker from "./ColorPicker";
import SubmitButton from "./SubmitButton";
import LoadingIndicator from "./LoadingIndicator";
import styles from "./ButtonForm.module.css";

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
  const [errorMesssage, setErrorMessage] = useState<string>();
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
    const { name, value } = e.target;

    if (name === "url" && value === "") {
      setErrorMessage("");
    }
    setButton({ ...button, [e.target.name]: e.target.value });

    if (name === "url") {
      validateUrl(value);
    }
  };

  const validateUrl = (url: string) => {
    const urlPattern = /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

    if (url && !urlPattern.test(url)) {
      setErrorMessage("Invalid URL format. Please enter a valid URL.");
    } else {
      setErrorMessage(""); // Clear error when the URL is valid
    }
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
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>
        {id ? "Edit Button" : "Create New Button"}
      </h1>
      <form onSubmit={handleSubmit} className={styles.buttonForm}>
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
        {errorMesssage && <p className={styles.error}>{errorMesssage}</p>}
        <SubmitButton label={id ? "Update" : "Create"} />
      </form>
    </div>
  );
}
