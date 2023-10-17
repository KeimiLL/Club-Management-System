import { Injectable } from "@angular/core";
import { FormArray, FormControl, Validators } from "@angular/forms";
import { Observable, switchMap, tap } from "rxjs";

import { TeamsHttpService } from "../../../../../../../../shared/api/teams-http.service";
import { UserService } from "../../../../../../../../shared/api/user.service";
import { SnackbarMessages } from "../../../../../../../../shared/models/messages.model";
import { ShortTeam } from "../../../../../../../../shared/models/team.model";
import {
    Roles,
    UserForAdmin,
} from "../../../../../../../../shared/models/user.model";
import { SnackbarService } from "../../../../../../../../shared/services/snackbar.service";
import { TableService } from "../../../../../../../../shared/services/table.service";
import { DestroyClass } from "../../../../../../../../shared/utils/destroyClass";
import { ModifyUsersPopupService } from "./modify-users-popup.service";

@Injectable()
export class SettingsModifyRootService extends DestroyClass {
    public passwordFormArray = new FormArray<FormControl<string>>([]);

    constructor(
        private readonly userService: UserService,
        private readonly table: TableService<UserForAdmin>,
        private readonly snack: SnackbarService,
        private readonly popup: ModifyUsersPopupService,
        private readonly httpTeams: TeamsHttpService
    ) {
        super();
        this.initData();
    }

    private initData(): void {
        this.table.currentPageIndex$
            .pipe(
                switchMap(() => this.refreshUsers$()),
                this.untilDestroyed()
            )
            .subscribe();
    }

    public changeUserRole(id: number, role: Roles): void {
        this.popup
            .rolePopupSwitch$(id, role)
            .pipe(
                switchMap(() => this.refreshUsers$()),
                tap(() => {
                    this.snack.showSnackBar(SnackbarMessages.ROLE_CHANGED);
                }),
                this.untilDestroyed()
            )
            .subscribe();
    }

    private refreshUsers$(): Observable<UserForAdmin[]> {
        return this.table
            .refreshTableItems$(
                this.userService.getUsersWithPagination(
                    this.table.currentPageIndex,
                    this.table.capacity
                )
            )
            .pipe(
                tap((users) => {
                    this.passwordFormArray.clear();
                    users.forEach(() => {
                        this.passwordFormArray.push(
                            this.createPasswordFormControl()
                        );
                    });
                })
            );
    }

    public getAllTeams(): Observable<ShortTeam[]> {
        return this.httpTeams.getAllTeams();
    }

    private createPasswordFormControl(): FormControl<string> {
        return new FormControl("", {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(8)],
        });
    }
}
