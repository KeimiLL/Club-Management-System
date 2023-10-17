import { Injectable } from "@angular/core";
import { tap } from "rxjs";

import { UserService } from "../../../../../../shared/api/user.service";
import { SnackbarMessages } from "../../../../../../shared/models/messages.model";
import { SnackbarService } from "../../../../../../shared/services/snackbar.service";

@Injectable()
export class SettingsRootService {
    constructor(
        private readonly userService: UserService,
        private readonly snack: SnackbarService
    ) {}

    public changeUsersPassword(id: number, new_password: string): void {
        this.userService
            .changePassword(id, {
                old_password: null,
                new_password,
            })
            .pipe(
                tap(() => {
                    this.snack.showSnackBar(SnackbarMessages.PASSWORD_CHANGED);
                })
            )
            .subscribe();
    }

    public changeOwnPassword(old_password: string, new_password: string): void {
        if (this.userService.currentUser !== null) {
            this.userService
                .changePassword(this.userService.currentUser.id, {
                    old_password,
                    new_password,
                })
                .pipe(
                    tap(() => {
                        this.snack.showSnackBar(
                            SnackbarMessages.PASSWORD_CHANGED
                        );
                    })
                )
                .subscribe();
        }
    }
}
