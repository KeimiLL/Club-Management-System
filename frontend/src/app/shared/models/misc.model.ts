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
