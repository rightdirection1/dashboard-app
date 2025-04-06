import Home from "@/components/Home";
import { ButtonData } from "@/types/buttonData";

interface IndexPageProps {
  initialButtons: ButtonData[];
}

export default function IndexPage({ initialButtons }: IndexPageProps) {
  return <Home initialButtons={initialButtons} />;
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/buttons`);
    const data = await res.json();

    return {
      props: {
        initialButtons: data,
      },
    };
  } catch (error) {
    console.error("Server-side fetch error:", error);
    return {
      props: {
        initialButtons: [],
      },
    };
  }
}
