export interface UserBase {
    full_name: string;
    email: string;
    id?: number;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserCreate extends UserBase, UserLogin {}

export interface UserCreateWithRole extends UserCreate {
    role: Roles;
}

export interface User extends UserBase {
    role: Roles;
}

export interface UserUpdate {
    full_name?: string;
    email?: string;
    password?: string;
    role?: Roles;
}

export enum Roles {
    Admin = "admin",
    Coach = "coach",
    Player = "player",
    Viewer = "viewer",
    Medic = "medic",
    Board = "board",
}
