import { ShortUser } from "./user.model";

export interface TableMeeting {
    id: number;
    name: string;
    is_yours: boolean;
    date: Date;
}

export interface MeetingBase {
    notes: string | null;
    name: string;
    date: string;
}

export interface MeetingCreate {
    meeting: MeetingBase;
    user_ids: number[];
}

export interface Meeting extends MeetingBase {
    id: number;
    created_by_user: ShortUser;
    users: ShortUser[];
}
