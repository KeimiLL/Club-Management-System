import {
    MatchEvent,
    MatchEventType,
} from "../../../../../../../../../shared/models/match-event.model";

export const goalIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="194" height="194" version="1.1">
    <circle fill="#000000" cx="97" cy="97" r="97" />
    <path fill="#ffffff" d="m 94,9.2 a 88,88 0 0 0 -55,21.8 l 27,0 28,-14.4 0,-7.4 z m 6,0 0,7.4 28,14.4 27,0
    a 88,88 0 0 0 -55,-21.8 z m -67.2,27.8 a 88,88 0 0 0 -20,34.2 l 16,27.6 23,-3.6 21,-36.2 -8.4,-22 -31.6,0
    z m 96.8,0 -8.4,22 21,36.2 23,3.6 15.8,-27.4 a 88,88 0 0 0 -19.8,-34.4 l -31.6,0 z m -50,26 -20.2,35.2 17.8,30.8
    39.6,0 17.8,-30.8 -20.2,-35.2 -34.8,0 z m -68.8,16.6 a 88,88 0 0 0 -1.8,17.4 88,88 0 0 0 10.4,41.4 l 7.4,-4.4
    -1.4,-29 -14.6,-25.4 z m 172.4,0.2 -14.6,25.2 -1.4,29 7.4,4.4 a 88,88 0 0 0 10.4,-41.4 88,88 0 0 0 -1.8,-17.2
    z m -106,57.2 -15.4,19 L 77.2,182.6 a 88,88 0 0 0 19.8,2.4 88,88 0 0 0 19.8,-2.4 l 15.4,-26.6 -15.4,-19 -39.6,0
    z m -47.8,2.6 -7,4 A 88,88 0 0 0 68.8,180.4 l -14,-24.6 -25.4,-16.2 z m 135.2,0 -25.4,16.2 -14,24.4 a 88,88 0
    0 0 46.4,-36.6 l -7,-4 z"/>
    </svg>
`;

// TODO: Remove after connecting the functionality.
export const dumbEventsArray: MatchEvent[] = [
    {
        minute: 10,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 1",
        is_own_event: true,
    },
    {
        minute: 15,
        event_type: MatchEventType.RedCard,
        description: "To jest opis zdarzenia 2",
        is_own_event: true,
    },
    {
        minute: 20,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 3",
        is_own_event: false,
    },
    {
        minute: 25,
        event_type: MatchEventType.YellowCard,
        description: "To jest opis zdarzenia 4",
        is_own_event: false,
    },
    {
        minute: 30,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 5",
        is_own_event: true,
    },
    {
        minute: 35,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 6",
        is_own_event: true,
    },
    {
        minute: 40,
        event_type: MatchEventType.YellowCard,
        description: "To jest opis zdarzenia 7",
        is_own_event: true,
    },
    {
        minute: 44,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 8",
        is_own_event: false,
    },
    {
        minute: 52,
        event_type: MatchEventType.RedCard,
        description: "To jest opis zdarzenia 9",
        is_own_event: false,
    },
    {
        minute: 60,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 10",
        is_own_event: true,
    },
    {
        minute: 66,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 11",
        is_own_event: true,
    },
    {
        minute: 67,
        event_type: MatchEventType.RedCard,
        description: "To jest opis zdarzenia 12",
        is_own_event: true,
    },
    {
        minute: 68,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 13",
        is_own_event: false,
    },
    {
        minute: 72,
        event_type: MatchEventType.RedCard,
        description: "To jest opis zdarzenia 14",
        is_own_event: false,
    },
    {
        minute: 77,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 15",
        is_own_event: true,
    },
    {
        minute: 78,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 16",
        is_own_event: true,
    },
    {
        minute: 80,
        event_type: MatchEventType.YellowCard,
        description: "To jest opis zdarzenia 17",
        is_own_event: true,
    },
    {
        minute: 82,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 18",
        is_own_event: false,
    },
    {
        minute: 88,
        event_type: MatchEventType.YellowCard,
        description: "To jest opis zdarzenia 19",
        is_own_event: false,
    },
    {
        minute: 90,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 20",
        is_own_event: true,
    },
];
