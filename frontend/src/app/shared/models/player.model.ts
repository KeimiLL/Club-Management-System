export interface PlayerBase {
    date_of_joining: string;
    date_of_birth: string;
    height: number;
    weight: number;
    user_id: number;
    team_id: number | null;
    notes: string | null;
}

export interface PlayerHealth {
    is_injured: boolean;
    diet: string | null;
}

export interface Player extends PlayerBase, PlayerHealth {}
