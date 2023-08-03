import { MainViewComponent } from "./components/routes/main-view/main-view.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./components/routes/auth/auth.component";

const routes: Routes = [
    {
        path: "app",
        component: MainViewComponent,
        loadChildren: () =>
            import(
                "./components/routes/main-view/main-view-routing.module"
            ).then((m) => m.MainViewRoutingModule),
    },
    {
        path: "auth",
        component: AuthComponent,
        loadChildren: () =>
            import("./components/routes/auth/auth-routing.module").then(
                (m) => m.AuthRoutingModule
            ),
    },
    { path: "**", redirectTo: "auth", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
