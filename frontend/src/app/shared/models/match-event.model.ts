export interface MatchEvent {
    minute: number;
    event_type: MatchEvents;
    description: string;
}

export interface MatchEventCreate extends MatchEvent {
    match_id: number;
}

export enum MatchEvents {
    Goal = "start",
    YellowCard = "red_card",
    RedCard = "yellow_card",
}
