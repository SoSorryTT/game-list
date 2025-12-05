import HomeContent from "@/app/components/HomeContent";

export default async function Home() {
    const fetchData = await fetch("https://fe-test-api.midassoft.dev/api/games", { method: "POST" });

    if (!fetchData.ok) {
        throw new Error("Failed to fetch games");
    }

    const data = await fetchData.json();

    return (
        <HomeContent gamesData={data?.result ?? []} />
    )
}
