/* eslint-disable @typescript-eslint/promise-function-async */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MeetingsComponent } from "./components/meetings/meetings.component";
import { SettingsComponent } from "./components/settings/settings.component";

const routes: Routes = [
    { path: "", redirectTo: "dashboard", pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent },
    {
        path: "settings",
        component: SettingsComponent,
        loadChildren: () =>
            import("./components/settings/settings-routing.module").then(
                (m) => m.SettingsRoutingModule
            ),
    },
    { path: "meetings", component: MeetingsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainViewRoutingModule {}
