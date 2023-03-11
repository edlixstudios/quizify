import { create } from "zustand";

interface Subscription {
    subscriptionId: string;
    setSubscriptionId: (newSub: string) => void;
}

export const useSubscription = create<Subscription>((set) => ({
    subscriptionId: "P-6CW11491EC926064HMQCREHY",
    setSubscriptionId: (newSub) => set((prev) => ({ ...prev, subscriptionId: newSub })),
}));
