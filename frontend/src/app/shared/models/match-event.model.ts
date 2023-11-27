export interface MatchEvent {
    minute: number;
    event_type: MatchEventType;
    description: string;
    is_own_event: boolean;
}

export interface MatchEventCreate extends MatchEvent {
    match_id: number;
}

export enum MatchEventType {
    Goal = "start",
    YellowCard = "red_card",
    RedCard = "yellow_card",
}
