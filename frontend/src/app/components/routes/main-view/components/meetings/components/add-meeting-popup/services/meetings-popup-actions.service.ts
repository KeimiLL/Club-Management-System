import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { catchError, of, tap } from "rxjs";

import { MeetingsHttpService } from "../../../../../../../../shared/api/meetings-http.service";
import { SnackbarMessages } from "../../../../../../../../shared/models/messages.model";
import { SnackbarService } from "../../../../../../../../shared/services/snackbar.service";
import { DestroyClass } from "../../../../../../../../shared/utils/destroyClass";
import { MeetingPopupComponent } from "../meeting-popup.component";
import { MeetingsPopupFormService } from "./meetings-popup-form.service";

@Injectable()
export class MeetingsPopupActionsService extends DestroyClass {
    constructor(
        private readonly http: MeetingsHttpService,
        private readonly forms: MeetingsPopupFormService,
        private readonly snack: SnackbarService,
        private readonly dialogRef: MatDialogRef<MeetingPopupComponent>
    ) {
        super();
    }

    public createNewMeeting(): void {
        this.http
            .postNewMeeting(this.forms.getFormData())
            .pipe(
                tap(() => {
                    this.snack.showSnackBar(
                        SnackbarMessages.MEETING_CREATE,
                        "normal"
                    );
                }),
                catchError(() => of(null)),
                this.untilDestroyed()
            )
            .subscribe(() => {
                this.closePopup(true);
            });
    }

    public editMeeting(): void {
        this.http
            .editMeeting(this.forms.getFormData(), this.forms.meetingData.id)
            .pipe(
                tap(() => {
                    this.snack.showSnackBar(
                        SnackbarMessages.MEETING_EDITED,
                        "normal"
                    );
                }),
                catchError(() => of(null)),
                this.untilDestroyed()
            )
            .subscribe(() => {
                this.closePopup(true);
            });
    }

    public closePopup(wasChanges: boolean): void {
        this.dialogRef.close(wasChanges);
    }
}
