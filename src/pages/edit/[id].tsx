// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

// export default function EditButton() {
//   const [button, setButton] = useState({
//     title: "",
//     color: "#000000",
//     url: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [notFound, setNotFound] = useState(false); // ✅ Track 404 error
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     if (!router.isReady) return; // ✅ Wait for router to be ready
//     if (!id || id === "undefined") return; // ✅ Avoid invalid fetch

//     setLoading(true);
//     fetch(`/api/buttons/${id}`)
//       .then((res) => {
//         if (res.status === 404) {
//           setNotFound(true); // ✅ Handle 404 error properly
//           setLoading(false);
//           return null;
//         }
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (data) setButton(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching button data:", error);
//         setLoading(false);
//       });
//   }, [id, router.isReady]); // ✅ Only fetch when id is valid

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const method = id && !notFound ? "PUT" : "POST"; // ✅ Use POST for new buttons
//     const endpoint =
//       id && !notFound ? `/api/buttons/update/${id}` : `/api/buttons/create`;

//     try {
//       const response = await fetch(endpoint, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(button),
//       });

//       if (!response.ok) throw new Error("Failed to save button");

//       const updatedButton = await response.json();
//       setButton(updatedButton);
//       router.push("/");
//     } catch (error) {
//       console.error("Error saving button:", error);
//     }
//   };

//   interface Button {
//     title: string;
//     color: string;
//     url: string;
//   }

//   interface ChangeEvent {
//     target: {
//       name: keyof Button;
//       value: string;
//     };
//   }

//   const handleChange = (e: ChangeEvent) => {
//     setButton({ ...button, [e.target.name]: e.target.value });
//   };

//   // ✅ If 404, show "Create New Button" instead of error
//   if (notFound) {
//     return (
//       <div>
//         <h1>Create New Button</h1>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Title:
//             <input
//               type="text"
//               name="title"
//               value={button.title}
//               onChange={handleChange}
//               placeholder="Enter button title"
//               required
//             />
//           </label>
//           <br />
//           <label>
//             Color:
//             <input
//               type="color"
//               name="color"
//               value={button.color}
//               onChange={handleChange}
//             />
//           </label>
//           <br />
//           <label>
//             URL:
//             <input
//               type="text"
//               name="url"
//               value={button.url}
//               onChange={handleChange}
//               placeholder="Enter button link"
//               required
//             />
//           </label>
//           <br />
//           <button type="submit">Create Button</button>
//         </form>
//       </div>
//     );
//   }

//   // ✅ Show loading state
//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{id ? "Edit Button" : "Create New Button"}</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             name="title"
//             value={button.title}
//             onChange={handleChange}
//             placeholder="Enter button title"
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Color:
//           <input
//             type="color"
//             name="color"
//             value={button.color}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           URL:
//           <input
//             type="text"
//             name="url"
//             value={button.url}
//             onChange={handleChange}
//             placeholder="Enter button link"
//             required
//           />
//         </label>
//         <br />
//         <button type="submit">{id ? "Update" : "Create"} Button</button>
//       </form>
//     </div>
//   );
// }
import ButtonForm from "@/components/ButtonForm";

export default function EditButtonPage() {
  return <ButtonForm />;
}
