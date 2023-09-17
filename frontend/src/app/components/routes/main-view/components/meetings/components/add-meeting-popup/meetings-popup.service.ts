import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import {
    BehaviorSubject,
    combineLatest,
    map,
    Observable,
    startWith,
} from "rxjs";

import { attendees } from "../../../../../../../shared/mock/meetings.mock";
import { User } from "../../../../../../../shared/models/user.model";
import { newMeetingDataFormBuilder } from "../../components/add-meeting-popup/newMeetingFormBuilder";

@Injectable()
export class MeetingsPopupService {
    public meetingForm: FormGroup;
    public attendeeInputControl = new FormControl<string>("");
    public dateInputControl = new FormControl<Date>({
        value: new Date(),
        disabled: true,
    });

    private readonly selectedAttendeesStore$ = new BehaviorSubject<User[]>([]);
    private readonly allAttendeesStore$ = new BehaviorSubject<User[]>([]);

    constructor() {
        this.meetingForm = newMeetingDataFormBuilder.buildFormGroup();
        this.allAttendees = attendees;
    }

    private set allAttendees(allAttendees: User[]) {
        this.allAttendeesStore$.next(allAttendees);
    }

    public get allAttendees(): User[] {
        return this.allAttendeesStore$.value;
    }

    public get allAttendees$(): Observable<User[]> {
        return this.allAttendeesStore$.asObservable();
    }

    public get filtredAttendees$(): Observable<User[]> {
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
                        !selectedAttendees.some((a) => a.id === attendee.id) &&
                        attendee.full_name.toLowerCase().includes(filterValue)
                );
            })
        );
    }

    private set selectedAttendees(selectedAttendees: User[]) {
        this.selectedAttendeesStore$.next(selectedAttendees);
    }

    public get selectedAttendees(): User[] {
        return this.selectedAttendeesStore$.value;
    }

    public get selectedAttendees$(): Observable<User[]> {
        return this.selectedAttendeesStore$.asObservable();
    }

    public addAttendeeToSelectedList(attendee: User): void {
        this.selectedAttendees = [...this.selectedAttendees, attendee];
        this.attendeeInputControl.setValue("");
        this.meetingForm
            .get("attendees")
            ?.setValue(this.selectedAttendees.map((a) => a.id));
    }

    public removeAttendeeFromSelectedList(attendee: User): void {
        this.selectedAttendees = this.selectedAttendees.filter(
            (a) => a.id !== attendee.id
        );
        this.meetingForm
            .get("attendees")
            ?.setValue(this.selectedAttendees.map((a) => a.id));
    }
}
