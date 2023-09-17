import { Routes } from "@angular/router";

import { ModulesPermissions } from "../../../shared/models/permission.model";
import { PermissionGuard } from "./../../../shared/guards/permission.guard";
import { MainViewComponent } from "./main-view.component";

export default [
    {
        path: "",
        component: MainViewComponent,
        children: [
            { path: "", redirectTo: "dashboard", pathMatch: "full" },
            {
                path: "dashboard",
                loadComponent: () =>
                    import("./components/dashboard/dashboard.component").then(
                        (c) => c.DashboardComponent
                    ),
                canActivate: [PermissionGuard],
                data: {
                    modulesPermission: ModulesPermissions.Dashboard,
                    requiredPermission: null,
                },
            },

            {
                path: "meetings",
                loadComponent: () =>
                    import("./components/meetings/meetings.component").then(
                        (c) => c.MeetingsComponent
                    ),
                data: {
                    modulesPermission: ModulesPermissions.Meetings,
                    requiredPermission: null,
                },
                canActivate: [PermissionGuard],
            },
            {
                path: "settings",
                loadChildren: () => import("./components/settings/routes"),
                canActivate: [PermissionGuard],
                data: {
                    modulesPermission: ModulesPermissions.Settings,
                    requiredPermission: null,
                },
            },
        ],
    },
] as Routes;
