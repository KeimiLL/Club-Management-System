import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthComponent } from "./components/routes/auth/auth.component";
import { ErrorComponent } from "./components/routes/error/error.component";
import { MainViewComponent } from "./components/routes/main-view/main-view.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { MainRoutes } from "./shared/models/misc.model";

const routes: Routes = [
    {
        path: MainRoutes.App,
        component: MainViewComponent,
        canActivate: [AuthGuard],

        loadChildren: () =>
            import(
                "./components/routes/main-view/main-view-routing.module"
            ).then((m) => m.MainViewRoutingModule),
    },
    {
        path: MainRoutes.Auth,
        component: AuthComponent,
        canActivate: [AuthGuard],

        loadChildren: () =>
            import("./components/routes/auth/auth-routing.module").then(
                (m) => m.AuthRoutingModule
            ),
    },
    { path: MainRoutes.Error, component: ErrorComponent },
    { path: "**", redirectTo: MainRoutes.Error, pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
