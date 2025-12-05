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
            <div className="bg-steam-header py-4 px-6 border-b border-steam-border">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-steam-text">GAME LIBRARY</h1>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search..."
                            className="w-64 py-2 px-4 bg-steam-input border-none rounded text-sm text-white placeholder-steam-muted focus:outline-none focus:ring-2 focus:ring-steam-accent"
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1 px-6 py-6">
                <div className="max-w-7xl mx-auto">
                    {loadingGames ? (
                        <div className="py-20 text-center text-steam-muted">Loading...</div>
                    ) : games.length === 0 ? (
                        <div className="py-20 text-center text-steam-muted">No games found</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
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
            </div>
            <div className="bg-steam-header py-4 px-6 border-t border-steam-border text-center text-xs text-steam-muted">
                Built with Next.js & TypeScript by Panu Tanavatavivat
            </div>
        </div>
    );
}
