import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { GeneralComponent } from "./components/general/general.component";
import { HelpComponent } from "./components/help/help.component";
import { ModifyComponent } from "./components/modify/modify.component";

const routes: Routes = [
    { path: "", redirectTo: "general", pathMatch: "full" },
    { path: "general", component: GeneralComponent },
    { path: "help", component: HelpComponent },
    { path: "modify", component: ModifyComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
