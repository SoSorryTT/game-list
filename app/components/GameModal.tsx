'use client'

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import { GameDetail } from "@/app/types/GameDetail";

type GameModalProps = {
    game: GameDetail | null;
    isOpen: boolean;
    loading?: boolean;
    onCloseAction: () => void;
};

export default function GameModal({ game, isOpen, loading, onCloseAction }: GameModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onCloseAction}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/70" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl bg-steam-bg rounded-lg shadow-xl overflow-hidden">
                                {loading ? (
                                    <div className="py-20 text-center text-steam-muted">Loading...</div>
                                ) : !game ? (
                                    <div className="py-20 text-center text-steam-muted">No game selected</div>
                                ) : (
                                    <>
                                        <div className="relative aspect-video">
                                            <Image
                                                src={game.thumbnail}
                                                alt={game.title}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <Dialog.Title className="text-2xl font-semibold text-white">
                                                    {game.title}
                                                </Dialog.Title>
                                                <button
                                                    onClick={onCloseAction}
                                                    className="text-steam-muted hover:text-white transition-colors cursor-pointer"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                            <div className="flex gap-3 mb-4">
                                                <span className="text-xs px-2 py-1 bg-steam-border text-steam-accent rounded">{game.category}</span>
                                                <span className="text-xs px-2 py-1 bg-steam-border text-steam-text rounded">{game.rating}/5</span>
                                                <span className="text-xs px-2 py-1 bg-steam-border text-steam-muted rounded">{game.releaseDate}</span>
                                            </div>
                                            <p className="text-sm text-steam-muted mb-6 leading-relaxed">{game.description}</p>
                                            {game.features && game.features.length > 0 && (
                                                <div className="mb-6">
                                                    <h4 className="text-sm font-medium text-steam-text mb-2">Features</h4>
                                                    <ul className="text-sm text-steam-muted space-y-1">
                                                        {game.features.map((feat, index) => (
                                                            <li key={`${game.id}-feat-${index}`} className="flex items-center gap-2">
                                                                <span className="w-1 h-1 bg-steam-accent rounded-full"></span>
                                                                {feat}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {game.screenshots && game.screenshots.length > 0 && (
                                                <div>
                                                    <h4 className="text-sm font-medium text-steam-text mb-2">Screenshots</h4>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {game.screenshots.map((shot, index) => (
                                                            <div key={`${game.id}-shot-${index}`} className="relative aspect-[9/16] rounded overflow-hidden">
                                                                <Image
                                                                    src={shot}
                                                                    alt={`${game.title} screenshot ${index + 1}`}
                                                                    fill
                                                                    className="object-cover"
                                                                    unoptimized
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
