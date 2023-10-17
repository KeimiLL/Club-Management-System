export interface PlayerBase {
    date_of_joining: string;
    date_of_birth: string;
    height: number;
    weight: number;
    notes: string;
    user_id: number;
    team_id: number;
}

export interface PlayerHealth {
    is_injured: boolean;
    diet: string;
}

export interface Player extends PlayerBase, PlayerHealth {}
