import { Routes } from "@angular/router";

import { PermissionGuard } from "../../../../../shared/guards/permission.guard";
import {
    modulesPermissions,
    settingsPermissions,
} from "../../../../../shared/models/permission.model";
import { SettingsComponent } from "./settings.component";

export default [
    {
        path: "",
        component: SettingsComponent,
        children: [
            {
                path: "",
                redirectTo: "general",
                pathMatch: "full",
            },
            {
                path: "general",
                loadComponent: () =>
                    import("./components/general/general.component").then(
                        (c) => c.GeneralComponent
                    ),
                data: {
                    modulesPermission: modulesPermissions.Settings,
                    requiredPermission: null,
                },
                canActivate: [PermissionGuard],
            },
            {
                path: "help",
                loadComponent: () =>
                    import("./components/help/help.component").then(
                        (c) => c.HelpComponent
                    ),
                data: {
                    modulesPermission: modulesPermissions.Settings,
                    requiredPermission: null,
                },
                canActivate: [PermissionGuard],
            },
            {
                path: "info",
                loadComponent: () =>
                    import("./components/info/info.component").then(
                        (c) => c.InfoComponent
                    ),
                data: {
                    modulesPermission: modulesPermissions.Settings,
                    requiredPermission: null,
                },
                canActivate: [PermissionGuard],
            },
            {
                path: "modify",
                loadComponent: () =>
                    import("./components/modify/modify.component").then(
                        (c) => c.ModifyComponent
                    ),
                data: {
                    modulesPermission: modulesPermissions.Settings,
                    requiredPermission: settingsPermissions.Modify,
                },
                canActivate: [PermissionGuard],
            },
        ],
    },
] as Routes;
