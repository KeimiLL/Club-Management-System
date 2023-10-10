export interface UserBase {
    full_name: string;
    email: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserCreate extends UserBase, UserLogin {}

export interface UserCreateWithRole extends UserCreate {
    role: Roles;
}

export interface ShortUser {
    full_name: string;
    id: number;
    role: Roles;
}

export interface UserForAdmin extends ShortUser {
    email: string;
}

export interface ChangePassword {
    new_password: string;
    old_password: string | null;
}

export interface User extends UserBase, ShortUser {}

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
