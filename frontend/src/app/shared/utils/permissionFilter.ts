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
        return menuItems.filter((snakeToNormal) =>
            roleDefinitions.modules.includes(
                snakeToNormal.name as ModulesPermissions
            )
        );
    }

    return menuItems.filter((snakeToNormal) =>
        roleDefinitions.permissions.includes(
            snakeToNormal.name as SettingsPermission
        )
    );
}
