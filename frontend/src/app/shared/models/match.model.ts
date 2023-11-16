interface MatchBase {
    date: string;
}

export enum MatchEvents {
    start = 0,
    goal = 1,
    end = 2,
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
