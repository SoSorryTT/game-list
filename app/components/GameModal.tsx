import Image from 'next/image';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";
import { Button } from "@heroui/button"

export type GameDetail = {
    id: number;
    title: string;
    category: string;
    rating: number;
    description: string;
    features: string[];
    releaseDate: string;
    thumbnail: string;
    screenshots: string[];
};

type GameModalProps = {
    game: GameDetail;
    onClose: () => void;
};

export default function GameModal({ game, onClose }: GameModalProps) {
    return (
        <Modal isOpen={true} onClose={onClose} placement="center">
            <ModalContent>
                {(close) => (
                    <>
                        {/* Header */}
                        <ModalHeader className="flex flex-col gap-1">
                            {game.title}
                        </ModalHeader>

                        {/* Body */}
                        <ModalBody>

                            {/* Image */}
                            <div className="relative aspect-video">
                                <Image
                                    src={game.thumbnail}
                                    alt={game.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>

                            {/* Badges */}
                            <div className="flex gap-2 my-2">
                                <span className="text-xs border px-2 py-1 rounded">{game.category}</span>
                                <span className="text-xs border px-2 py-1 rounded">⭐ {game.rating}</span>
                                <span className="text-xs border px-2 py-1 rounded">{game.releaseDate}</span>
                            </div>

                            {/* Description */}
                            <p className="text-sm">{game.description}</p>

                            {/* Features */}
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">Features</h3>
                                <ul className="list-disc list-inside text-sm flex flex-col gap-1">
                                    {game.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Screenshots */}
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">Screenshots</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {game.screenshots.map((shot, index) => (
                                        <div key={index} className="relative aspect-[9/16]">
                                            <Image
                                                src={shot}
                                                alt={`${game.title} screenshot ${index + 1}`}
                                                fill
                                                className="object-cover rounded-lg"
                                                unoptimized
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </ModalBody>

                        {/* Footer */}
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={close}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
