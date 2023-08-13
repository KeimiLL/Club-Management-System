import { MenuItem } from "src/app/shared/models/misc.model";
import { SettingsPermission } from "src/app/shared/models/permission.model";

export const settingsMenuItems: MenuItem[] = [
    { name: SettingsPermission.General, route: "/app/settings/general" },
    { name: SettingsPermission.Modifyusers, route: "/app/settings/modify" },
    { name: SettingsPermission.Help, route: "/app/settings/help" },
];
