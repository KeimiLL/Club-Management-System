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

export enum MeetingsPermission {
    CreateMeeting = "create_meeting",
    EditMeeting = "edit_meeting",
}

export enum TeamPermission {
    CreateTeam = "create_team",
    EditTeam = "edit_team",
}

export enum SquadPermissions {
    AllPLayers = "all_players",
    OwnProfile = "own_profile",
}

export enum SchedulePermission {
    Marks = "marks",
    AddEvent = "add_event",
    CheckPresent = "check_present",
    AddSquad = "add_squad",
}

export enum SettingsPermission {
    Modify = "modify_users",
    Help = "help",
    General = "general",
}

export const allPermissions: SubPermissions[] = [
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

const subPermissionsBase: SubPermissions[] = [
    SettingsPermission.General,
    SettingsPermission.Help,
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

    [Roles.Board]: {
        modules: Object.values(ModulesPermissions),
        permissions: [...subPermissionsBase, ...Object.values(TeamPermission)],
    },

    [Roles.Coach]: {
        modules: [
            ...modulesBase,
            ModulesPermissions.Squad,
            ModulesPermissions.Schedule,
        ],
        permissions: [
            ...subPermissionsBase,
            ...Object.values(SchedulePermission),
            SquadPermissions.AllPLayers,
        ],
    },

    [Roles.Player]: {
        modules: [
            ...modulesBase,
            ModulesPermissions.Squad,
            ModulesPermissions.Schedule,
        ],
        permissions: [...subPermissionsBase, SquadPermissions.OwnProfile],
    },

    [Roles.Medic]: {
        modules: [...modulesBase],
        permissions: [...subPermissionsBase],
    },

    [Roles.Viewer]: {
        modules: [...modulesBase],
        permissions: [...subPermissionsBase],
    },

    [Roles.None]: {
        modules: [ModulesPermissions.Dashboard],
        permissions: [],
    },
};
