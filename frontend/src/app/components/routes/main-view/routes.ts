import { Routes } from "@angular/router";

import { modulesPermissions } from "../../../shared/models/permission.model";
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
                    modulesPermission: modulesPermissions.Dashboard,
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
                    modulesPermission: modulesPermissions.Meetings,
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
                    modulesPermission: modulesPermissions.Teams,
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
                    modulesPermission: modulesPermissions.Squad,
                    requiredPermission: null,
                },
                canActivate: [PermissionGuard],
            },

            {
                path: "schedule",
                loadComponent: () =>
                    import("./components/schedule/schedule.component").then(
                        (c) => c.ScheduleComponent
                    ),
                data: {
                    modulesPermission: modulesPermissions.Schedule,
                    requiredPermission: null,
                },
                canActivate: [PermissionGuard],
            },

            {
                path: "settings",
                loadChildren: () => import("./components/settings/routes"),
                canActivate: [PermissionGuard],
                data: {
                    modulesPermission: modulesPermissions.Settings,
                    requiredPermission: null,
                },
            },
        ],
    },
] as Routes;
