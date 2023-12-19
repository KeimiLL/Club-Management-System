import { SettingsMenuItem } from "../../../../../../../shared/models/misc.model";
import { settingsPermissions } from "../../../../../../../shared/models/permission.model";

export const settingsMenuItems: SettingsMenuItem[] = [
    { name: "General", route: "/app/settings/general", permission: null },
    {
        name: settingsPermissions.Modify,
        route: "/app/settings/modify",
        permission: settingsPermissions.Modify,
    },
    { name: "Help", route: "/app/settings/help", permission: null },
    { name: "Info", route: "/app/settings/info", permission: null },
];
