import { User } from "./user.model";

export interface ShortMeeting {
    id: number;
    name: string;
    isYour: boolean;
}

export interface LongMeeting extends ShortMeeting {
    date: Date;
}

export interface Meeting extends LongMeeting {
    attendees: User[];
    description: string;
}

export interface addMeeting {
    notes: string;
    name: string;
    date: Date;
    user_ids: number[];
}
