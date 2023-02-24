import { create } from "zustand";

interface Modal {
    showModal: boolean;
    setShowModal: (newState: boolean) => void;
    toggleShowModal: () => void;
}

export const useModal = create<Modal>((set) => ({
    showModal: false,
    setShowModal: (newState) => set((prev) => ({ ...prev, showModal: newState })),
    toggleShowModal: () => set((prev) => ({ ...prev, showModal: !prev.showModal })),
}));
