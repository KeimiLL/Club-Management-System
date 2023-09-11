import { User } from "./user.model";

export interface ShortMeetingDataCell {
    name: string;
    isYour: boolean;
}

export interface LongMeetingDataCell extends ShortMeetingDataCell {
    date: Date;
}

export interface Meeting extends LongMeetingDataCell {
    attendees: User[];
    description: string;
}
