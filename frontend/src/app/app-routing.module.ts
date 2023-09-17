import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./shared/guards/auth.guard";
import { MainRoutes } from "./shared/models/misc.model";

const routes: Routes = [
    {
        path: MainRoutes.App,
        canActivate: [AuthGuard],
        loadChildren: () => import("./components/routes/main-view/routes"),
    },
    {
        path: MainRoutes.Auth,
        canActivate: [AuthGuard],
        loadChildren: () => import("./components/routes/auth/routes"),
    },
    {
        path: MainRoutes.Error,
        loadChildren: () =>
            import("./components/routes/error/error.component").then(
                (c) => c.ErrorComponent
            ),
        canActivate: [AuthGuard],
    },
    { path: "**", redirectTo: MainRoutes.Auth, pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
