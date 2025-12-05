import HomeContent from "@/app/components/HomeContent";
import { BASE_URL } from "@/app/config";

export default async function Home() {
    const fetchData = await fetch(`${BASE_URL}api/games`, { method: "POST" });

    if (!fetchData.ok) {
        throw new Error("Failed to fetch games");
    }

    const data = await fetchData.json();

    return (
        <HomeContent gamesData={data?.result ?? []} />
    )
}
