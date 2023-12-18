import { Roles } from "./user.model";

export interface RequiredPermissions {
    modulesPermission: ModulesPermissions;
    requiredPermission: SubPermissions | null;
}

export interface RolePermission {
    modules: ModulesPermissions[];
    permissions: SubPermissions[];
}

export const modulesPermissions = {
    Settings: "settings",
    Dashboard: "dashboard",
    Meetings: "meetings",
    Teams: "teams",
    Squad: "squad",
    Schedule: "schedule",
} as const;

export type ModulesPermissions =
    (typeof modulesPermissions)[keyof typeof modulesPermissions];

export const meetingsPermissions = {
    SeeAll: "see_all",
    EditMeeting: "edit_meeting",
    DeleteMeeting: "delete_meeting",
} as const;

export type MeetingsPermissions =
    (typeof meetingsPermissions)[keyof typeof meetingsPermissions];

export const teamPermissions = {
    CreateTeam: "create_team",
    DeleteTeam: "delete_match",
    EditTeam: "edit_team",
    MoreTeams: "more_teams",
    MorePlayers: "more_players",
} as const;

export type TeamsPermissions =
    (typeof teamPermissions)[keyof typeof teamPermissions];

export const matchPermissions = {
    CreateMatch: "create_team",
    DeleteMatch: "delete_match",
    EditMatch: "edit_team",
    MatchActions: "match_actions",
} as const;

export type MatchPermissions =
    (typeof matchPermissions)[keyof typeof matchPermissions];

export const settingsPermissions = {
    Modify: "modify_users",
} as const;

export type SettingsPermissions =
    (typeof settingsPermissions)[keyof typeof settingsPermissions];

export type SubPermissions =
    | SettingsPermissions
    | MeetingsPermissions
    | TeamsPermissions
    | MatchPermissions;

export const RoleColorsMapping: Record<Roles, string> = {
    [Roles.Admin]: "#ef436b",
    [Roles.Coach]: "#ffce5c",
    [Roles.Player]: "#d281b5",
    [Roles.Viewer]: "#b4befe",
    [Roles.Board]: "#06d6a0",
    [Roles.None]: "#a8a8a8",
};

export const RoleDefinitions: Record<Roles, RolePermission> = {
    [Roles.Admin]: {
        modules: [...Object.values(modulesPermissions)],
        permissions: [
            ...Object.values(meetingsPermissions),
            ...Object.values(teamPermissions),
            ...Object.values(matchPermissions),
            ...Object.values(settingsPermissions),
        ],
    },

    [Roles.Board]: {
        modules: [...Object.values(modulesPermissions)],
        permissions: [
            ...Object.values(meetingsPermissions),
            ...Object.values(matchPermissions),
            ...Object.values(teamPermissions),
        ],
    },

    [Roles.Coach]: {
        modules: [...Object.values(modulesPermissions)],
        permissions: [
            ...Object.values(meetingsPermissions),
            ...Object.values(matchPermissions),
            teamPermissions.EditTeam,
            teamPermissions.MorePlayers,
            teamPermissions.MoreTeams,
        ],
    },

    [Roles.Player]: {
        modules: [
            modulesPermissions.Dashboard,
            modulesPermissions.Settings,
            modulesPermissions.Meetings,
            modulesPermissions.Squad,
            modulesPermissions.Schedule,
        ],
        permissions: [
            meetingsPermissions.EditMeeting,
            matchPermissions.MatchActions,
        ],
    },

    [Roles.Viewer]: {
        modules: [
            modulesPermissions.Dashboard,
            modulesPermissions.Settings,
            modulesPermissions.Meetings,
        ],
        permissions: [],
    },

    [Roles.None]: {
        modules: [],
        permissions: [],
    },
};
