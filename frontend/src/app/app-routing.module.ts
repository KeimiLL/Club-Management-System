import "./components/routes/auth/modules/auth.module"
import "./components/routes/main-view/main-view.component"
import "@angular/core"
import "@angular/router"
import RouterModule }
import { AuthModule }
import { MainViewComponent }
import { NgModule }
import { Routes

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
