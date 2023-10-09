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

export interface TableResponse<T> {
    items: T[];
    total: number;
}

export enum MainRoutes {
    App = "app",
    Auth = "auth",
    Error = "error",
}

export interface CustomToolbar {
    items: string[];
}
