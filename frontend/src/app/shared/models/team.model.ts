import { ShortCoach } from "./coach.model";
import { ShortPlayer } from "./player.model";

export interface ShortTeam {
    name: string;
    id: number;
}

export interface TeamCreateBasicData {
    name: string;
    coach_id: number;
}

export interface TeamCreate {
    team: TeamCreateBasicData;
    player_ids: number[];
}

export interface TableTeam extends ShortTeam {
    coach_user_full_name: string;
}

export interface Team extends ShortTeam {
    coach: ShortCoach | null;
    players: ShortPlayer[];
}
