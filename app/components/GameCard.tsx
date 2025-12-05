import Image from "next/image";
import { Game } from "@/app/types/Game";

type GameCardProps = {
    game: Game;
    onClick: () => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
    return (
        <div
            key={game.id}
            className="border rounded-xl overflow-hidden cursor-pointer hover:opacity-50"
            onClick={onClick}
        >
            <div className="relative aspect-square">
                <Image
                    src={game.thumbnail}
                    alt={game.title}
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>
            <div className="p-4 flex flex-col gap-2">
                <h3 className="font-semibold">{game.title}</h3>
                <div className="flex justify-between items-center">
                    <span className="text-xs border px-2 py-1 rounded">
                      {game.category}
                    </span>
                    <span className="text-sm">⭐ {game.rating}</span>
                </div>
            </div>
        </div>
    )
}