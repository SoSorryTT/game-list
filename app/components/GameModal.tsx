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
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-lg">
                            <button
                                onClick={onCloseAction}
                                className="absolute top-4 right-4 px-3 py-1 text-sm border rounded-lg bg-white/80 hover:bg-gray-100"
                            >
                                Close
                            </button>
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <p>Loading game details...</p>
                                </div>
                            ) : !game ? (
                                <div className="flex justify-center items-center h-64">
                                    <p>No game selected</p>
                                </div>
                            ) : (
                                <>
                                    <Dialog.Title className="text-xl font-semibold mb-4 pr-16">{game.title}</Dialog.Title>
                                    <div className="relative aspect-video mb-4">
                                        <Image
                                            src={game.thumbnail}
                                            alt={game.title}
                                            fill
                                            className="object-cover rounded-lg"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="flex gap-2 my-2">
                                        <span className="text-xs border px-2 py-1 rounded">{game.category}</span>
                                        <span className="text-xs border px-2 py-1 rounded">⭐ {game.rating}</span>
                                        <span className="text-xs border px-2 py-1 rounded">{game.releaseDate}</span>
                                    </div>
                                    <p className="text-sm mb-4">{game.description}</p>
                                    <div className="mb-4">
                                        <h3 className="font-semibold">Features</h3>
                                        <ul className="list-disc list-inside text-sm space-y-1">
                                            {game.features?.map((feature, idx) => (
                                                <li key={idx}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="font-semibold">Screenshots</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {game.screenshots?.map((shot, idx) => (
                                                <div key={idx} className="relative aspect-[9/16]">
                                                    <Image
                                                        src={shot}
                                                        alt={`${game.title} screenshot ${idx + 1}`}
                                                        fill
                                                        className="object-cover rounded-lg"
                                                        unoptimized
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
