export interface ShortTeam {
    name: string;
    id: number;
}

export interface TeamCreate {
    name: string;
    coach_id: number;
}

export interface TableTeam extends ShortTeam {
    coach_user_full_name: string;
}

export interface Team extends TableTeam {
    players: string[];
}
