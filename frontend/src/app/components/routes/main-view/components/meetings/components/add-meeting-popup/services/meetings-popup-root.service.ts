import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { UserService } from "../../../../../../../../shared/api/user.service";
import { Meeting } from "../../../../../../../../shared/models/meeting.model";
import { ShortUser } from "../../../../../../../../shared/models/user.model";
import { DestroyClass } from "../../../../../../../../shared/utils/destroyClass";
import { MeetingsPopupFormService } from "./meetings-popup-form.service";

@Injectable()
export class MeetingsPopupRootService extends DestroyClass {
    private readonly allAttendeesStore$ = new BehaviorSubject<ShortUser[]>([]);
    private readonly selectedAttendeesStore$ = new BehaviorSubject<ShortUser[]>(
        []
    );

    constructor(
        private readonly userService: UserService,
        private readonly forms: MeetingsPopupFormService
    ) {
        super();
    }

    public initData(meeting: Meeting | null): void {
        this.userService
            .getAllUsers()
            .pipe(
                tap((users) => {
                    const idToFilter =
                        meeting === null
                            ? this.userService.currentUser?.id
                            : meeting.created_by_user.id;

                    this.allAttendees = users.filter(
                        (attendee) => attendee.id !== idToFilter
                    );

                    if (meeting !== null) {
                        const meetingUserIds = meeting.users.map(
                            (dataUser) => dataUser.id
                        );
                        this.selectedAttendees = users.filter((user) =>
                            meetingUserIds.includes(user.id)
                        );
                    }
                }),
                this.untilDestroyed()
            )
            .subscribe();
    }

    private set allAttendees(allAttendees: ShortUser[]) {
        this.allAttendeesStore$.next(allAttendees);
    }

    public get allAttendees$(): Observable<ShortUser[]> {
        return this.allAttendeesStore$.asObservable();
    }

    private set selectedAttendees(selectedAttendees: ShortUser[]) {
        this.selectedAttendeesStore$.next(selectedAttendees);
    }

    public get selectedAttendees(): ShortUser[] {
        return this.selectedAttendeesStore$.value;
    }

    public get selectedAttendees$(): Observable<ShortUser[]> {
        return this.selectedAttendeesStore$.asObservable();
    }

    public selectAttendee(attendee: ShortUser): void {
        this.selectedAttendees = [...this.selectedAttendees, attendee];
        this.forms.setAttendeesValue(this.selectedAttendees);
    }

    public removeAttendee(attendee: ShortUser): void {
        this.selectedAttendees = this.selectedAttendees.filter(
            (a) => a.id !== attendee.id
        );
        this.forms.setAttendeesValue(this.selectedAttendees);
    }
}
