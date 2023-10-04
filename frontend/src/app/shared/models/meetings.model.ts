import { ShortUser } from "./user.model";

export interface ShortMeeting {
    id: number;
    name: string;
    is_yours: boolean;
}

export interface LongMeeting extends ShortMeeting {
    date: Date;
}

export interface PrimaryDataMeeting {
    notes: string | null;
    name: string;
    date: string;
}

export interface NewMeeting {
    meeting: PrimaryDataMeeting;
    user_ids: number[];
}

export interface Meeting extends PrimaryDataMeeting {
    id: number;
    created_by_user: ShortUser;
    users: ShortUser[];
}
