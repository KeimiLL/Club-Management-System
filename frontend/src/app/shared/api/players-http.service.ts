import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BackendResponse, TableResponse } from "../models/misc.model";
import { PlayerCreate, ShortPlayer, TablePlayer } from "../models/player.model";

@Injectable({
    providedIn: "root",
})
export class PlayersHttpService {
    constructor(private readonly http: HttpClient) {}

    public createPlayer(player: PlayerCreate): Observable<BackendResponse> {
        return this.http.post<BackendResponse>("/api/v1/players", player);
    }

    public getAllPlayers(): Observable<ShortPlayer[]> {
        return this.http.get<ShortPlayer[]>("/api/v1/players/all");
    }

    public getPlayersByTeamId(
        id: number,
        page: number,
        capacity: number
    ): Observable<TableResponse<TablePlayer>> {
        return this.http.get<TableResponse<TablePlayer>>(
            `api/v1/teams?team_id=${id}page=${page}&per_page=${capacity}`
        );
    }
}
