export interface TeamCreate {
    name: string;
    coach_id: string;
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
