import { ShortPlayer } from "./player.model";

export enum MatchContentType {
    Details = "details",
    Squad = "squad",
    Events = "events",
}

export enum MatchState {
    Start = "start",
    End = "end",
}

export interface MatchDetails {
    notes: string;
    date: string;
}

export interface MatchScoreBase {
    opponent: string;
    is_home: boolean;
}

export interface MatchScore extends MatchScoreBase {
    goals_scored: number | null;
    goals_conceded: number | null;
}

export interface MatchBase extends MatchScoreBase, MatchDetails {
    team_id: number;
}

export interface MatchCreate {
    match: MatchBase;
    player_ids: number[];
}

export interface Match extends MatchDetails, MatchScore {
    id: number;
    team_name: string;
    players: ShortPlayer[];
    has_started: boolean;
    has_ended: boolean;
}

export interface TableMatch extends MatchScore {
    id: number;
    team_name: string;
    date: string;
}
