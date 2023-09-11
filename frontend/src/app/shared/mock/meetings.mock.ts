import { LongMeetingDataCell } from "../models/meetings.model";

export const longMeetingsMockup: LongMeetingDataCell[] = [
    {
        name: "Meeting 1",
        isYour: false,
        date: new Date(Date.now()),
    },
    {
        name: "Meeting 2",
        isYour: true,
        date: new Date(Date.now()),
    },
    {
        name: "Meeting 3",
        isYour: false,
        date: new Date(Date.now()),
    },
    {
        name: "Meeting 4",
        isYour: true,
        date: new Date(Date.now()),
    },
    {
        name: "Meeting 5",
        isYour: true,
        date: new Date(Date.now()),
    },
    {
        name: "Meeting 6",
        isYour: false,
        date: new Date(Date.now()),
    },
];
