import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, Observable, switchMap, tap } from "rxjs";

import { CoachesHttpService } from "../../../../../../shared/api/coaches-http.service";
import { CoachName } from "../../../../../../shared/models/coach.model";
import { DropdownViewManagerService } from "../../../../../../shared/services/dropdown-view-manager.service";
import { DestroyClass } from "../../../../../../shared/utils/destroyClass";

@Injectable()
export class SquadRootService extends DestroyClass {
    private readonly teamCoachStore$ = new BehaviorSubject<CoachName | null>(
        null
    );

    constructor(
        private readonly httpCoach: CoachesHttpService,
        private readonly dropdown: DropdownViewManagerService
    ) {
        super();
        this.initData();
    }

    private initData(): void {
        this.dropdown.teamId$
            .pipe(
                filter(Boolean),
                switchMap((teamId) => this.refreshCoach$(teamId)),
                this.untilDestroyed()
            )
            .subscribe();
    }

    private set teamCoach(coach: null | CoachName) {
        this.teamCoachStore$.next(coach);
    }

    public get teamCoach$(): Observable<CoachName | null> {
        return this.teamCoachStore$.asObservable();
    }

    private refreshCoach$(teamId: number): Observable<CoachName> {
        return this.httpCoach
            .getCoachByTeamId(teamId)
            .pipe(tap((coach) => (this.teamCoach = coach)));
    }
}
