const TUTORIAL_KEY = 'cast_tutorial_seen';
const EXPIRY_DAYS = 30;

interface TutorialData {
    seen: boolean;
    timestamp: number;
}

export function shouldShowTutorial(): boolean {
    if (typeof window === 'undefined') return false;

    const data = localStorage.getItem(TUTORIAL_KEY);
    if (!data) return true;

    try {
        const parsed: TutorialData = JSON.parse(data);
        const expiryMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
        const isExpired = Date.now() - parsed.timestamp > expiryMs;
        return isExpired;
    } catch {
        return true;
    }
}

export function markTutorialSeen(): void {
    if (typeof window === 'undefined') return;

    const data: TutorialData = { seen: true, timestamp: Date.now() };
    localStorage.setItem(TUTORIAL_KEY, JSON.stringify(data));
}

export function resetTutorial(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TUTORIAL_KEY);
}
