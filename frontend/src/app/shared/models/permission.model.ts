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
    Squad = "squad",
    Schedule = "schedule",
}

export type SubPermissions =
    | TeamPermission
    | MeetingsPermission
    | SettingsPermission
    | SquadPermissions
    | SchedulePermission;

export enum SquadPermissions {
    Bio = "bio",
    Stats = "stats",
    Modify = "modify",
    Cluster = "cluster",
}

export enum TeamPermission {
    All = "all",
}

export enum MeetingsPermission {
    CreateMeeting = "createMeeting",
    SeeAllMeetings = "seeAllMeeting",
}

export enum SettingsPermission {
    ModifyUsers = "modify_users",
    Help = "help",
    General = "general",
}

export enum SchedulePermission {
    Marks = "marks",
}

const allPermissions: SubPermissions[] = [
    ...Object.values(TeamPermission),
    ...Object.values(MeetingsPermission),
    ...Object.values(SettingsPermission),
    ...Object.values(SchedulePermission),
    ...Object.values(SquadPermissions),
];

const modulesBase: ModulesPermissions[] = [
    ModulesPermissions.Dashboard,
    ModulesPermissions.Settings,
    ModulesPermissions.Meetings,
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
        permissions: [...allPermissions],
    },
    [Roles.Coach]: {
        modules: [
            ...modulesBase,
            ModulesPermissions.Squad,
            ModulesPermissions.Schedule,
        ],
        permissions: [
            ...Object.values(TeamPermission),
            ...Object.values(SchedulePermission),
        ],
    },
    [Roles.Player]: {
        modules: [
            ...modulesBase,
            ModulesPermissions.Squad,
            ModulesPermissions.Schedule,
        ],
        permissions: [],
    },
    [Roles.Viewer]: {
        modules: [...modulesBase],
        permissions: [],
    },
    [Roles.Medic]: {
        modules: [...modulesBase],
        permissions: [],
    },
    [Roles.Board]: {
        modules: Object.values(ModulesPermissions),
        permissions: [],
    },
    [Roles.None]: {
        modules: [ModulesPermissions.Dashboard],
        permissions: [],
    },
};
