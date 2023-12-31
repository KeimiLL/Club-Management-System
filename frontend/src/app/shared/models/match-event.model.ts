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
    Goal = "goal",
    YellowCard = "yellow_card",
    RedCard = "red_card",
}
