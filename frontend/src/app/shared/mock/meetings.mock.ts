import { LongMeeting } from "../models/meetings.model";
import { Roles, User } from "../models/user.model";

export const longMeetingsMockup: LongMeeting[] = [
    {
        id: 1,
        name: "Meeting 1",
        isYour: false,
        date: new Date(Date.now()),
    },
    {
        id: 2,
        name: "Meeting 2",
        isYour: true,
        date: new Date(Date.now()),
    },
    {
        id: 3,
        name: "Meeting 3",
        isYour: false,
        date: new Date(Date.now()),
    },
    {
        id: 4,
        name: "Meeting 4",
        isYour: true,
        date: new Date(Date.now()),
    },
    {
        id: 5,
        name: "Meeting 5",
        isYour: true,
        date: new Date(Date.now()),
    },
    {
        id: 6,
        name: "Meeting 6",
        isYour: false,
        date: new Date(Date.now()),
    },
];

export const attendees: User[] = [
    {
        id: 0,
        full_name: "test1",
        email: "test@example.com",
        role: Roles.Admin,
    },
    {
        id: 1,
        full_name: "viewer",
        email: "test@example.com",
        role: Roles.Viewer,
    },
    {
        id: 2,
        full_name: "board",
        email: "test@example.com",
        role: Roles.Board,
    },
    {
        id: 3,
        full_name: "medic",
        email: "test@example.com",
        role: Roles.Medic,
    },
    {
        id: 4,
        full_name: "coach",
        email: "test@example.com",
        role: Roles.Coach,
    },
    {
        id: 5,
        full_name: "player",
        email: "test@example.com",
        role: Roles.Player,
    },
];
