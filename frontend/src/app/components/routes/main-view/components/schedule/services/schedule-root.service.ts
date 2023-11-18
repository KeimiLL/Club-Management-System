import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { Match } from "../../../../../../shared/models/match.model";
import { DropdownViewManagerService } from "../../../../../../shared/services/dropdown-view-manager.service";
import { DestroyClass } from "../../../../../../shared/utils/destroyClass";
import { SchedulePopupComponent } from "../components/schedule-popup/schedule-popup.component";

@Injectable()
export class ScheduleRootService extends DestroyClass {
    constructor(
        private readonly dialog: MatDialog,
        private readonly dropdown: DropdownViewManagerService
    ) {
        super();
    }

    public openNewMatchDialog(): void {
        this.openDialog(null)
            .afterClosed()
            .pipe
            // switchMap((result: boolean) => {
            //     // if (result) return this.refreshMatches$();
            //     // return of(null);
            // }),
            // this.untilDestroyed()
            ()
            .subscribe();
    }

    // public openeditMeeting$Dialog(): void {
    //     this.openDialog(this.splitView.currentItem)
    //         .afterClosed()
    //         .pipe(
    //             filter((result) => result === true),
    //             switchMap((result: boolean) => {
    //                 if (result) {
    //                     return forkJoin([
    //                         this.refreshMeetings$(),
    //                         this.refreshCurrentMeeting$(
    //                             this.splitView.currentId
    //                         ),
    //                     ]).pipe(catchError(() => of(null)));
    //                 }
    //                 return of(null);
    //             }),
    //             this.untilDestroyed()
    //         )
    //         .subscribe();
    // }

    private openDialog(
        dialogData: Match | null
    ): MatDialogRef<SchedulePopupComponent> {
        return this.dialog.open(SchedulePopupComponent, {
            width: "50vw",
            disableClose: true,
            data: { data: dialogData, teamId: this.dropdown.currentTeam?.id },
        });
    }
}
