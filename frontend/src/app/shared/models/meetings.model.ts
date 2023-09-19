import { ShortUser } from "./user.model";

export interface ShortMeeting {
    id: number;
    name: string;
    isYour: boolean;
}

export interface LongMeeting extends ShortMeeting {
    date: Date;
}

export interface PrimaryDataMeeting {
    notes: string;
    name: string;
    date: Date;
}

export interface AddMeeting {
    meeting: PrimaryDataMeeting;
    user_ids: number[];
}

export interface MeetingResponse extends PrimaryDataMeeting {
    id: number;
    created_by_user: ShortUser;
    users: ShortUser[];
}
