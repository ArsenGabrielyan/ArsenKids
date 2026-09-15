import HomePage from "@/components/pages/homepage";
import { getLearningSheets } from "@/lib/helpers/data";

export default async function Home() {
  const downloads = await getLearningSheets()
  return (
    <HomePage
      downloads={downloads}
    />
  );
}
