import { Routes } from "@angular/router";

import { AuthComponent } from "./auth.component";

export default [
    {
        path: "",
        component: AuthComponent,
        children: [
            { path: "", redirectTo: "login", pathMatch: "full" },
            {
                path: "login",
                loadComponent: () =>
                    import("./login/login.component").then(
                        (c) => c.LoginComponent
                    ),
            },
            {
                path: "register",
                loadComponent: () =>
                    import("./register/register.component").then(
                        (c) => c.RegisterComponent
                    ),
            },
        ],
    },
] as Routes;
