import { MenuItem } from "../models/misc.model";
import {
    ModulesPermissions,
    RoleDefinitions,
    SettingsPermission,
} from "../models/permission.model";
import { Roles } from "../models/user.model";
// import { UserService } from "../services/user.service";

export function filterMenuItemsByPermissions<T extends MenuItem>(
    menuItems: T[],
    isModulesFilter = true
): T[] {
    // const userRole = this.userService.currentUser.role
    const userRole = Roles.Admin; // for now to test
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
