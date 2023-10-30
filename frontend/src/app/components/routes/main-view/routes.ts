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
                data: {
                    modulesPermission: ModulesPermissions.Dashboard,
                    requiredPermission: null,
                },
                canActivate: [PermissionGuard],
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
                path: "teams",
                loadComponent: () =>
                    import("./components/teams/teams.component").then(
                        (c) => c.TeamsComponent
                    ),
                data: {
                    modulesPermission: ModulesPermissions.Teams,
                    requiredPermission: null,
                },
                canActivate: [PermissionGuard],
            },

            {
                path: "squad",
                loadComponent: () =>
                    import("./components/squad/squad.component").then(
                        (c) => c.SquadComponent
                    ),
                data: {
                    modulesPermission: ModulesPermissions.Squad,
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
