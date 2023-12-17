import { convertToParamMap } from "@angular/router";
import { of } from "rxjs";

import { Match } from "../models/match.model";
import { Meeting } from "../models/meeting.model";
import { Player } from "../models/player.model";
import { Team } from "../models/team.model";
import { Roles, User } from "../models/user.model";

export class ActivatedRouteQueryParams {
    queryParams = of({});
}

export class ActivatedRouteParamMap {
    snapshot = {
        paramMap: convertToParamMap({}),
    };
}

export const mockUser: User = {
    id: 1,
    full_name: "admin",
    email: "admin@cms.com",
    role: Roles.Admin,
};

export const mockMatch: Match = {
    id: 1,
    team_name: "Our Team",
    players: [{ user_id: 0, user_full_name: "player" }],
    notes: "No notes",
    date: "today",
    goals_scored: 1,
    goals_conceded: 0,
    opponent: "Opponent",
    is_home: true,
    has_ended: false,
    has_started: true,
};

export const mockMeeting: Meeting = {
    id: 1,
    created_by_user: mockUser,
    date: "2023-11-19",
    notes: "notes",
    name: "name",
    users: [mockUser],
};

export const mockPlayer: Player = {
    date_of_joining: "2023-11-19",
    date_of_birth: "2023-11-19",
    height: 190,
    weight: 90,
    user_id: 1,
    team_id: 1,
    notes: "notes",
    user_full_name: "Full Name",
    is_injured: false,
    diet: "diet",
};

export const mockTeam: Team = {
    name: "name",
    id: 1,
    coach: { user_id: 1, user_full_name: "Full Name" },
    players: [{ user_id: 1, user_full_name: "Full Name" }],
};
