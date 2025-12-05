'use client';

import { useState } from 'react';
import GameCard from "@/app/components/GameCard";
import GameModal, { GameDetail } from "@/app/components/GameModal";

// Types
type Game = {
  id: number;
  title: string;
  category: string;
  rating: number;
  thumbnail: string;
};

// Mock Data
const mockGames: Game[] = [
  { id: 1, title: "Dragon Quest", category: "RPG", rating: 4.5, thumbnail: "https://placehold.co/400x400?text=Game-Image" },
  { id: 2, title: "Speed Runner", category: "Action", rating: 4, thumbnail: "https://placehold.co/400x400?text=Game-Image" },
  { id: 3, title: "Galaxy Defender", category: "Shooter", rating: 4.8, thumbnail: "https://placehold.co/400x400?text=Game-Image" },
  { id: 4, title: "Farm Legend", category: "Simulation", rating: 3.9, thumbnail: "https://placehold.co/400x400?text=Game-Image" },
  { id: 5, title: "Mystic Card", category: "Card", rating: 4.3, thumbnail: "https://placehold.co/400x400?text=Game-Image" },
  { id: 6, title: "Battle Forge", category: "Strategy", rating: 4.1, thumbnail: "https://placehold.co/400x400?text=Game-Image" },
  { id: 7, title: "Neon Drift", category: "Racing", rating: 4.6, thumbnail: "https://placehold.co/400x400?text=Game-Image" },
  { id: 8, title: "Cyber Ninja", category: "Action", rating: 4.2, thumbnail: "https://placehold.co/400x400?text=Game-Image" },
  { id: 9, title: "Ocean Empire", category: "Simulation", rating: 3.8, thumbnail: "https://placehold.co/400x400?text=Game-Image" },
  { id: 10, title: "Pixel Town", category: "Casual", rating: 4, thumbnail: "https://placehold.co/400x400?text=Game-Image" },
];

const mockGameDetail: GameDetail = {
    id: 1,
    title: "Dragon Quest",
    category: "RPG",
    rating: 4.5,
    description: "Embark on a legendary adventure filled with dragons, heroes, and ancient magic.",
    features: [
        "Turn-based combat",
        "Character customization",
        "Epic story arcs",
        "Open-world exploration"
    ],
    releaseDate: "2021-01-01",
    thumbnail: "https://placehold.co/400x400?text=Game-Image",
    screenshots: [
        "https://placehold.co/400x720?text=Screen-shot-1",
        "https://placehold.co/400x720?text=Screen-shot-2"
    ]
}

export default function Home() {
  const [games] = useState<Game[]>(mockGames);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<GameDetail | null>(null);

  const filteredGames = games.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div className="min-h-screen flex flex-col">
          {/*Modal*/}
          {selectedGame && (
              <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
          )}
          {/* Header */}
        <header className="py-6 px-8 border-b">
          <div className="text-center flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">Game Library</h1>
            <p className="text-sm">Discover Games</p>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-8 flex flex-col gap-8">
          {/* Search */}
          <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games..."
              className="w-full py-3 px-4 border rounded-lg"
          />

          {/* Empty */}
          {filteredGames.length === 0 && (
              <div className="text-center py-16">
                <p>No games found</p>
              </div>
          )}

          {/* Games Grid */}
          {filteredGames.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {filteredGames.map((game) => (
                    <GameCard
                        key={game.id}
                        game={game}
                        onClick={() => setSelectedGame(mockGameDetail)}
                    />
                ))}
              </div>
          )}
        </div>

        {/* Footer */}
        <div className="py-6 text-center text-xs border-t">
          <p>Built with Next.js & TypeScript by Panu Tanavatavivat</p>
        </div>
      </div>
  );
}
