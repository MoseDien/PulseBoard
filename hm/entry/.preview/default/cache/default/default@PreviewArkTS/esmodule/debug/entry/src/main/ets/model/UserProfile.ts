export interface BookItem {
    title: string;
    author: string;
    color: string;
    accent: string;
}
export interface MediaItem {
    title: string;
    meta: string;
    emoji: string;
}
export interface PlaceItem {
    city: string;
    note: string;
    emoji: string;
}
export interface UserProfile {
    id: number;
    name: string;
    handle: string;
    avatar: string;
    avatarColor: string;
    bio: string;
    lastUpdated: string;
    mood: string;
    books: BookItem[];
    movies: MediaItem[];
    places: PlaceItem[];
    podcasts: MediaItem[];
}
/** Data rendered by the system Navigation title bar for a detail destination. */
export interface DetailHeaderState {
    name: string;
    handle: string;
    avatar: string;
    avatarColor: string;
    mood: string;
    lastUpdated: string;
}
export class DetailRouteParam {
    id: number;
    header: DetailHeaderState;
    constructor(id: number, header: DetailHeaderState) {
        this.id = id;
        this.header = header;
    }
}
export enum UpdateLevel {
    Stale = 0,
    Quarter = 1,
    Month = 2,
    Week = 3
}
export function getUpdateLevel(dateText: string): UpdateLevel {
    const days = Math.max(0, Math.floor((Date.now() - new Date(dateText).getTime()) / 86400000));
    if (days <= 7) {
        return UpdateLevel.Week;
    }
    if (days <= 30) {
        return UpdateLevel.Month;
    }
    if (days <= 90) {
        return UpdateLevel.Quarter;
    }
    return UpdateLevel.Stale;
}
