import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { CoachesHttpService } from "../../../../../../../../shared/api/coaches-http.service";
import { TeamsHttpService } from "../../../../../../../../shared/api/teams-http.service";
import { ShortCoach } from "../../../../../../../../shared/models/coach.model";
import { TeamCreate } from "../../../../../../../../shared/models/team.model";
import { TeamsPopupComponent } from "../teams-popup.component";

@Injectable()
export class TeamsPopupRootService {
    private readonly coachesStore$ = new BehaviorSubject<ShortCoach[]>([]);

    public set coaches(coaches: ShortCoach[]) {
        this.coachesStore$.next(coaches);
    }

    public get coaches$(): Observable<ShortCoach[]> {
        return this.coachesStore$.asObservable();
    }

    constructor(
        private readonly http: TeamsHttpService,
        private readonly httpCoaches: CoachesHttpService,
        private readonly dialogRef: MatDialogRef<TeamsPopupComponent>
    ) {
        this.initData();
    }

    private initData(): void {
        this.httpCoaches
            .getAllCoaches()
            .pipe(
                tap((coaches) => {
                    this.coaches = coaches;
                })
            )
            .subscribe();
    }

    public createTeam(team: TeamCreate): void {
        this.http
            .createTeam(team)
            .pipe(
                tap(() => {
                    this.dialogRef.close(team);
                })
            )
            .subscribe();
    }
}
