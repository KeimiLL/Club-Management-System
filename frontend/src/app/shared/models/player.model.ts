export interface PlayerBase {
    date_of_joining: string;
    date_of_birth: string;
    height: number;
    weight: number;
    user_id: number;
    team_id: number | null;
    notes: string | null;
}

export interface ShortPlayer {
    user_id: number;
    user_full_name: string;
}

export interface PlayerHealth {
    is_injured: boolean;
    diet: string | null;
}

export interface TablePlayer extends ShortPlayer {
    date_of_birth: string;
    is_injured: boolean;
}

export interface PlayerCreate extends PlayerBase, PlayerHealth {}

export interface Player extends PlayerBase, PlayerHealth, ShortPlayer {}
