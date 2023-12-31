import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BackendResponse, TableResponse } from "../models/misc.model";
import {
    Player,
    PlayerCreate,
    ShortPlayer,
    TablePlayer,
} from "../models/player.model";

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
            `api/v1/players?team_id=${id}&page=${page}&per_page=${capacity}`
        );
    }

    public getPlayerById(id: number): Observable<Player> {
        return this.http.get<Player>(`api/v1/players/${id}`);
    }

    public deletePlayerById(id: number): Observable<BackendResponse> {
        return this.http.delete<BackendResponse>(`api/v1/players/${id}`);
    }
}
