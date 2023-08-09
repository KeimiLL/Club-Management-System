import { Roles } from "./user.model";

export enum ModulesPermissions {
    Settings = "settings",
    Dashboard = "dashboard",
    Meetings = "meetings",
    Teams = "teams",
    Schedule = "schedule",
}

export interface RolePermission {
    modules: ModulesPermissions[];
    settings: SettingsPermission[];
    dashboard: null;
    meetings: MeetingsPermission[];
    teams: TeamPermission[];
    schedule: SchedulePermission[];
}

export enum TeamPermission {
    Bio = "bio",
    Stats = "stats",
    Modify = "modify",
    Cluster = "cluster",
}
export enum MeetingsPermission {
    CreateMeeting = "createMeeting",
}

export enum SettingsPermission {
    Modifyusers = "modifyUsers",
}

export enum SchedulePermission {
    Marks = "marks",
}

export const RoleDefinitions: Record<Roles, RolePermission> = {
    [Roles.Admin]: {
        modules: Object.values(ModulesPermissions),
        settings: Object.values(SettingsPermission),
        dashboard: null,
        meetings: Object.values(MeetingsPermission),
        teams: Object.values(TeamPermission),
        schedule: Object.values(SchedulePermission),
    },
    [Roles.Coach]: {
        modules: [],
        settings: [],
        dashboard: null,
        meetings: [],
        teams: [],
        schedule: [],
    },
    [Roles.Player]: {
        modules: [],
        settings: [],
        dashboard: null,
        meetings: [],
        teams: Object.values(TeamPermission),
        schedule: [],
    },
    [Roles.Viewer]: {
        modules: [ModulesPermissions.Settings],
        settings: [],
        dashboard: null,
        meetings: [],
        teams: [],
        schedule: [],
    },
};
