import { Roles } from "./user.model";

export interface RequiredPermissions {
    modulesPermission: ModulesPermissions;
    requiredPermission: SubPermissions | null;
}

export interface RolePermission {
    modules: ModulesPermissions[];
    permissions: SubPermissions[];
}

export enum ModulesPermissions {
    Settings = "settings",
    Dashboard = "dashboard",
    Meetings = "meetings",
    Teams = "teams",
    Schedule = "schedule",
}

export type SubPermissions =
    | TeamPermission
    | MeetingsPermission
    | SettingsPermission
    | SchedulePermission;

export enum TeamPermission {
    Bio = "bio",
    Stats = "stats",
    Modify = "modify",
    Cluster = "cluster",
}
export enum MeetingsPermission {
    CreateMeeting = "createMeeting",
    SeeAllMeetings = "seeAllMeeting",
}

export enum SettingsPermission {
    Modifyusers = "modify_users",
    Help = "help",
    General = "general",
}

export enum SchedulePermission {
    Marks = "marks",
}

export const allPermissions: SubPermissions[] = [
    ...Object.values(TeamPermission),
    ...Object.values(MeetingsPermission),
    ...Object.values(SettingsPermission),
    ...Object.values(SchedulePermission),
];

export const RoleColorsMapping: Record<Roles, string> = {
    [Roles.Admin]: "#ef436b",
    [Roles.Coach]: "#ffce5c",
    [Roles.Player]: "#d281b5",
    [Roles.Viewer]: "#b4befe",
    [Roles.Medic]: "#ffb056",
    [Roles.Board]: "#06d6a0",
    [Roles.None]: "#a8a8a8",
};

export const RoleDefinitions: Record<Roles, RolePermission> = {
    [Roles.Admin]: {
        modules: Object.values(ModulesPermissions),
        permissions: [
            ...Object.values(TeamPermission),
            ...Object.values(MeetingsPermission),
            ...Object.values(SettingsPermission),
            ...Object.values(SchedulePermission),
        ],
    },
    [Roles.Coach]: {
        modules: Object.values(ModulesPermissions),
        permissions: [
            ...Object.values(TeamPermission),
            ...Object.values(SchedulePermission),
        ],
    },
    [Roles.Player]: {
        modules: Object.values(ModulesPermissions),
        permissions: [TeamPermission.Bio],
    },
    [Roles.Viewer]: {
        modules: [ModulesPermissions.Dashboard, ModulesPermissions.Settings],
        permissions: [],
    },
    [Roles.Medic]: {
        modules: [ModulesPermissions.Dashboard, ModulesPermissions.Settings],
        permissions: [],
    },
    [Roles.Board]: {
        modules: [ModulesPermissions.Dashboard, ModulesPermissions.Settings],
        permissions: [],
    },
    [Roles.None]: {
        modules: [],
        permissions: [],
    },
};
