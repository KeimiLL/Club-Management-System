import { MenuItem } from "../../../../../../../shared/models/misc.model";
import { SettingsPermission } from "../../../../../../../shared/models/permission.model";

export const settingsMenuItems: MenuItem[] = [
    { name: SettingsPermission.General, route: "/app/settings/general" },
    { name: SettingsPermission.Modify, route: "/app/settings/modify" },
    { name: SettingsPermission.Help, route: "/app/settings/help" },
];
