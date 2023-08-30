import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PermissionGuard } from "src/app/shared/guards/permission.guard";
import { ModulesPermissions } from "src/app/shared/models/permission.model";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MeetingsComponent } from "./components/meetings/meetings.component";
import { SettingsComponent } from "./components/settings/settings.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        data: {
            modulesPermission: ModulesPermissions.Dashboard,
            requiredPermission: null,
        },
        canActivate: [PermissionGuard],
    },
    {
        path: "settings",
        component: SettingsComponent,
        data: {
            modulesPermission: ModulesPermissions.Settings,
            requiredPermission: null,
        },
        canActivate: [PermissionGuard],
        loadChildren: () =>
            import("./components/settings/settings-routing.module").then(
                (m) => m.SettingsRoutingModule
            ),
    },
    {
        path: "meetings",
        component: MeetingsComponent,
        data: {
            modulesPermission: ModulesPermissions.Meetings,
            requiredPermission: null,
        },
        canActivate: [PermissionGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainViewRoutingModule {}
