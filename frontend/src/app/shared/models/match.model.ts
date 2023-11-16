interface MatchBase {
    date: string;
}

export interface MatchScore {
    opponent: string;
    is_home: boolean;
    goals_scored: number;
    goals_conceded: number;
}

export enum MatchEvents {
    Goal = "start",
    YellowCard = "red_card",
    RedCard = "yellow_card",
}

export enum MatchContinuity {
    Start = "start",
    End = "end",
}

export interface MatchEvent {
    minute: number;
    event_type: MatchEvents;
    description: string;
}

export interface MatchEventCreate extends MatchEvent {
    match_id: number;
}

export interface MatchCreate extends MatchBase {}

export interface TableMatch extends MatchBase {}

export interface Match extends MatchBase {}

export enum MatchContentType {
    Details = "details",
    Squad = "squad",
    Events = "events",
}
