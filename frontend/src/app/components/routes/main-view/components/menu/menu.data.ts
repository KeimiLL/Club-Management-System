import { modulesPermissions } from "../../../../..//shared/models/permission.model";
import { MainMenuItem } from "../../../../../shared/models/misc.model";

export const menuItems: MainMenuItem[] = [
    {
        name: modulesPermissions.Dashboard,
        icon: "dashboard",
        route: "/app/dashboard",
    },
    {
        name: modulesPermissions.Meetings,
        icon: "question_answer",
        route: "/app/meetings",
    },
    { name: modulesPermissions.Teams, icon: "groups", route: "/app/teams" },
    {
        name: modulesPermissions.Squad,
        icon: "directions_run",
        route: "/app/squad",
    },
    {
        name: modulesPermissions.Schedule,
        icon: "event_available",
        route: "/app/schedule",
    },
    {
        name: modulesPermissions.Settings,
        icon: "settings",
        route: "/app/settings",
    },
];
