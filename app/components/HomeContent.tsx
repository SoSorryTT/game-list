'use client'

import { useState } from "react";
import GameModal from "@/app/components/GameModal";
import GameCard from "@/app/components/GameCard";
import { Game } from "@/app/types/Game";
import { GameDetail } from "@/app/types/GameDetail";

type HomeContentProps = {
    gamesData: Game[];
}

export default function HomeContent({ gamesData }: HomeContentProps) {
    const [games] = useState<Game[]>(gamesData);
    const [openGameModal, setOpenGameModal] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGame, setSelectedGame] = useState<GameDetail | null>(null);

    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    async function fetchGameDetail(id: number): Promise<GameDetail> {
        const res = await fetch(`https://fe-test-api.midassoft.dev/api/games/${id}`, {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch game details");
        }

        const data = await res.json();
        return data.data[0];
    }


    return (
        <div className="min-h-screen flex flex-col">
            {selectedGame && (
                <GameModal
                    game={selectedGame}
                    isOpen={openGameModal}
                    onCloseAction={() => {
                        setOpenGameModal(false)
                        setSelectedGame(null)
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search games..."
                    className="w-full py-3 px-4 border rounded-lg"
                />
                {filteredGames.length === 0 && (
                    <div className="text-center py-16">
                        <p>No games found</p>
                    </div>
                )}
                {filteredGames.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {filteredGames.map((game) => (
                            <GameCard
                                key={game.id}
                                game={game}
                                onClick={async () => {
                                    const detail = await fetchGameDetail(game.id);
                                    setSelectedGame(detail);
                                    setOpenGameModal(true);
                                }}
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