import { create } from 'zustand';

interface FeatureFlagStore {
    rsvpEnabled: boolean;
    setRSVPEnabled: (enabled: boolean) => void;
}

export const useFeatureFlagStore = create<FeatureFlagStore>((set) => ({
    rsvpEnabled: false,
    setRSVPEnabled: (enabled: boolean) => set({ rsvpEnabled: enabled }),
}));