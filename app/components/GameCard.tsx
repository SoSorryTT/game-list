import Image from "next/image";
import { Game } from "@/app/types/Game";

type GameCardProps = {
    game: Game;
    onClick: () => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
    return (
        <div
            className="bg-steam-card rounded overflow-hidden cursor-pointer hover:bg-steam-card-hover transition-colors group"
            onClick={onClick}
        >
            <div className="relative aspect-[16/9]">
                <Image
                    src={game.thumbnail}
                    alt={game.title}
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>
            <div className="p-3">
                <h3 className="text-sm font-medium text-steam-text truncate group-hover:text-white transition-colors">
                    {game.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-steam-accent">{game.category}</span>
                    <span className="text-xs text-steam-muted">{game.rating}/5</span>
                </div>
            </div>
        </div>
    )
}
