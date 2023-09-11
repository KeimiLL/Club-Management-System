import { LongMeeting } from "../models/meetings.model";

export const longMeetingsMockup: LongMeeting[] = [
    {
        id: "1",
        name: "Meeting 1",
        isYour: false,
        date: new Date(Date.now()),
    },
    {
        id: "2",
        name: "Meeting 2",
        isYour: true,
        date: new Date(Date.now()),
    },
    {
        id: "3",
        name: "Meeting 3",
        isYour: false,
        date: new Date(Date.now()),
    },
    {
        id: "4",
        name: "Meeting 4",
        isYour: true,
        date: new Date(Date.now()),
    },
    {
        id: "5",
        name: "Meeting 5",
        isYour: true,
        date: new Date(Date.now()),
    },
    {
        id: "6",
        name: "Meeting 6",
        isYour: false,
        date: new Date(Date.now()),
    },
];
