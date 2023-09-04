export interface BackendResponse {
    message: string;
}

export interface MenuItem {
    name: string;
    route: string;
}

export interface MainMenuItem extends MenuItem {
    icon: string;
}

export enum MainRoutes {
    App = "app",
    Auth = "auth",
    Error = "error",
}
