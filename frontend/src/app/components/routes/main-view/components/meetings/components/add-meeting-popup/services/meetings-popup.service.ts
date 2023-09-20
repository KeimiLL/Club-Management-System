import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import {
    BehaviorSubject,
    combineLatest,
    map,
    Observable,
    startWith,
    tap,
} from "rxjs";

import { AddMeeting } from "../../../../../../../../shared/models/meetings.model";
import { ShortUser } from "../../../../../../../../shared/models/user.model";
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

    private readonly selectedAttendeesStore$ = new BehaviorSubject<ShortUser[]>(
        []
    );

    private readonly allAttendeesStore$ = new BehaviorSubject<ShortUser[]>([]);

    constructor(
        private readonly http: MeetingsPopupHttpService,
        private readonly dialogRef: MatDialogRef<AddMeetingPopupComponent>,
        private readonly userService: UserService
    ) {
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

    public get filtredAttendees$(): Observable<ShortUser[]> {
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
        const newMeeting = this.meetingForm.value as AddMeeting;

        this.http.postNewMeeting(newMeeting).subscribe(() => {
            this.closePopup();
        });
    }

    public closePopup(): void {
        this.dialogRef.close();
    }
}
