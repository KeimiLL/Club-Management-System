export interface TeamCreate {
    name: string;
    coach_id: number;
}

export interface TableTeam {
    id: number;
    name: string;
    coach_user_full_name: string;
}

export interface Team {
    id: number;
    name: string;
    coach_user_full_name: string;
    players: string[];
}
