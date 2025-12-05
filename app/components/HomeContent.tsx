'use client'

import { useState, useEffect } from "react";
import GameModal from "@/app/components/GameModal";
import GameCard from "@/app/components/GameCard";
import { Game } from "@/app/types/Game";
import { GameDetail } from "@/app/types/GameDetail";
import { BASE_URL } from "@/app/config";

type HomeContentProps = {
    gamesData: Game[];
}

export default function HomeContent({ gamesData }: HomeContentProps) {
    const [games, setGames] = useState<Game[]>(gamesData);
    const [openGameModal, setOpenGameModal] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [selectedGame, setSelectedGame] = useState<GameDetail | null>(null);
    const [loadingGames, setLoadingGames] = useState(false);
    const [loadingGameDetail, setLoadingGameDetail] = useState(false);

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (!searchInput) {
                setGames(gamesData);
                return;
            }

            setLoadingGames(true);

            const res = await fetch(
                `${BASE_URL}api/search?query=${encodeURIComponent(searchInput)}`,
                { method: "POST" }
            );
            const data = await res.json();
            setGames(data?.result ?? []);
            setLoadingGames(false);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchInput, gamesData]);

    async function fetchGameDetail(id: number): Promise<GameDetail> {
        setLoadingGameDetail(true);
        try {
            const res = await fetch(`${BASE_URL}api/games/${id}`);
            if (!res.ok) throw new Error("Failed to fetch game details");
            const data = await res.json();
            return data.data[0];
        } finally {
            setLoadingGameDetail(false);
        }
    }

    const handleGameClick = async (id: number) => {
        const detail = await fetchGameDetail(id);
        setSelectedGame(detail);
        setOpenGameModal(true);
    }

    return (
        <div className="min-h-screen flex flex-col">
            {selectedGame && (
                <GameModal
                    game={selectedGame}
                    isOpen={openGameModal}
                    loading={loadingGameDetail}
                    onCloseAction={() => {
                        setOpenGameModal(false);
                        setSelectedGame(null);
                    }}
                />
            )}
            <div className="py-6 px-8 border-b">
                <div className="text-center flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold">Game Library</h1>
                    <p className="text-sm">Discover Games</p>
                </div>
            </div>
            <div className="p-8 flex flex-col gap-8">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search games..."
                    className="w-full py-3 px-4 border rounded-lg"
                />
                {loadingGames ? (
                    <div className="text-center py-16">
                        <p>Loading games...</p>
                    </div>
                ) : games.length === 0 ? (
                    <div className="text-center py-16">
                        <p>No games found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {games.map((game) => (
                            <GameCard
                                key={game.id}
                                game={game}
                                onClick={() => handleGameClick(game.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="py-6 text-center text-xs border-t">
                <p>Built with Next.js & TypeScript by Panu Tanavatavivat</p>
            </div>
        </div>
    );
}
