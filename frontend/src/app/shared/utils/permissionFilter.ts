import { MenuItem } from "../models/misc.model";
import {
    ModulesPermissions,
    RoleDefinitions,
    SettingsPermission,
} from "../models/permission.model";
import { Roles } from "../models/user.model";

export function filterMenuItemsByPermissions<T extends MenuItem>(
    menuItems: T[],
    userRole: Roles,
    isModulesFilter = true
): T[] {
    const roleDefinitions = RoleDefinitions[userRole];

    if (isModulesFilter) {
        return menuItems.filter((menuItem) =>
            roleDefinitions.modules.includes(
                menuItem.name as ModulesPermissions
            )
        );
    }

    return menuItems.filter((menuItem) =>
        roleDefinitions.permissions.includes(
            menuItem.name as SettingsPermission
        )
    );
}
