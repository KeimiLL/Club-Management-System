import { SettingsComponent } from "./components/settings/settings.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MeetingsComponent } from "./components/meetings/meetings.component";

const routes: Routes = [
    { path: "", redirectTo: "dashboard", pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent },
    { path: "settings", component: SettingsComponent },
    { path: "meetings", component: MeetingsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainViewRoutingModule {}
