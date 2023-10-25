import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { CoachesHttpService } from "../../../../../../shared/api/coaches-http.service";
import { ShortCoach } from "../../../../../../shared/models/coach.model";

@Injectable()
export class SquadRootService {
    private readonly teamCoachStore$ = new BehaviorSubject<ShortCoach | null>(
        null
    );

    constructor(private readonly httpCoach: CoachesHttpService) {}

    private set teamCoach(coach: null | ShortCoach) {
        this.teamCoachStore$.next(coach);
    }

    public get teamCoach$(): Observable<ShortCoach | null> {
        return this.teamCoachStore$.asObservable();
    }
}
