import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import {
    BehaviorSubject,
    catchError,
    combineLatest,
    map,
    Observable,
    of,
    startWith,
    tap,
} from "rxjs";

import { NewMeeting } from "../../../../../../../../shared/models/meetings.model";
import { SnackbarMessages } from "../../../../../../../../shared/models/messages.model";
import { ShortUser } from "../../../../../../../../shared/models/user.model";
import { SnackbarService } from "../../../../../../../../shared/services/snackbar.service";
import { UserService } from "../../../../../../../../shared/services/user.service";
import { formatDateFromInputForBackend } from "../../../../../../../../shared/utils/dateHelpers";
import { AddMeetingPopupComponent } from "../add-meeting-popup.component";
import {
    newMeetingDataFormBuilder,
    NewMeetingFormGroup,
} from "../newMeetingFormBuilder";
import { MeetingsPopupHttpService } from "./meetings-popup-http.service";

@Injectable()
export class MeetingsPopupService {
    public meetingForm: FormGroup<NewMeetingFormGroup>;
    public attendeeInputControl = new FormControl<string>("");

    private readonly allAttendeesStore$ = new BehaviorSubject<ShortUser[]>([]);
    private readonly selectedAttendeesStore$ = new BehaviorSubject<ShortUser[]>(
        []
    );

    constructor(
        private readonly http: MeetingsPopupHttpService,
        private readonly dialogRef: MatDialogRef<AddMeetingPopupComponent>,
        private readonly userService: UserService,
        private readonly snack: SnackbarService
    ) {
        this.initData();
    }

    private initData(): void {
        this.meetingForm = newMeetingDataFormBuilder.buildFormGroup();
        this.userService
            .getAllUsers()
            .pipe(
                tap((users) => {
                    this.allAttendees = users;
                })
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

    public get filteredAttendees$(): Observable<ShortUser[]> {
        return combineLatest([
            this.allAttendees$,
            this.selectedAttendees$,
            this.attendeeInputControl.valueChanges.pipe(
                startWith(this.attendeeInputControl.value)
            ),
        ]).pipe(
            map(([allAttendees, selectedAttendees, inputValue]) => {
                const filterValue = inputValue ?? "";
                return allAttendees.filter(
                    (attendee) =>
                        attendee.id !== this.userService.currentUser?.id &&
                        !selectedAttendees.some((a) => a.id === attendee.id) &&
                        attendee.full_name.toLowerCase().includes(filterValue)
                );
            })
        );
    }

    public addAttendeeToSelectedList(attendee: ShortUser): void {
        this.selectedAttendees = [...this.selectedAttendees, attendee];
        this.attendeeInputControl.setValue("");
        this.meetingForm
            .get("user_ids")
            ?.setValue(this.selectedAttendees.map((a) => a.id));
    }

    public removeAttendeeFromSelectedList(attendee: ShortUser): void {
        this.selectedAttendees = this.selectedAttendees.filter(
            (a) => a.id !== attendee.id
        );
        this.meetingForm
            .get("user_ids")
            ?.setValue(this.selectedAttendees.map((a) => a.id));
    }

    public setDateInMeetingForm(selectedDate: Date): void {
        this.meetingForm.controls.meeting.controls.date.setValue(
            formatDateFromInputForBackend(selectedDate)
        );
    }

    public createNewMeeting(): void {
        const newMeeting = this.meetingForm.value as NewMeeting;

        this.http
            .postNewMeeting(newMeeting)
            .pipe(
                tap(() => {
                    this.snack.showSnackBar(
                        SnackbarMessages.MEETING_CREATE,
                        "normal"
                    );
                }),
                catchError(() => of(null))
            )
            .subscribe(() => {
                this.closePopup();
            });
    }

    public closePopup(): void {
        this.dialogRef.close();
    }
}