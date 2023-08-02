import { AuthModule } from "./components/routes/auth/modules/auth.module";
import { MainViewComponent } from "./components/routes/main-view/main-view.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "app",
        component: MainViewComponent,
        loadChildren: () =>
            import(
                "./components/routes/main-view/main-view-routing.module"
            ).then((m) => m.MainViewRoutingModule),
    },
    { path: "**", redirectTo: "app", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), AuthModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
