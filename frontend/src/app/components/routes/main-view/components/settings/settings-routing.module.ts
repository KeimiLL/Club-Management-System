import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PermissionGuard } from "src/app/shared/guards/permission.guard";

import {
    ModulesPermissions,
    SettingsPermission,
} from "./../../../../../shared/models/permission.model";
import { GeneralComponent } from "./components/general/general.component";
import { HelpComponent } from "./components/help/help.component";
import { ModifyComponent } from "./components/modify/modify.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "general",
        pathMatch: "full",
    },
    {
        path: "general",
        component: GeneralComponent,
        data: {
            modulesPermission: ModulesPermissions.Settings,
            requiredPermission: null,
        },
        canActivate: [PermissionGuard],
    },
    {
        path: "help",
        component: HelpComponent,
        data: {
            modulesPermission: ModulesPermissions.Settings,
            requiredPermission: null,
        },
        canActivate: [PermissionGuard],
    },
    {
        path: "modify",
        component: ModifyComponent,
        data: {
            modulesPermission: ModulesPermissions.Settings,
            requiredPermissions: SettingsPermission.Modifyusers,
        },
        canActivate: [PermissionGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
