import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, of, tap } from "rxjs";

import { SnackbarMessages } from "../../../../../shared/models/messages.model";
import { SnackbarService } from "./../../../../../shared/services/snackbar.service";
import { UserService } from "./../../../../../shared/services/user.service";

@Injectable()
export class MenuRootService {
    constructor(
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly snack: SnackbarService
    ) {}

    public logout(): void {
        this.userService
            .logout()
            .pipe(
                tap(() => {
                    this.snack.showSnackBar(SnackbarMessages.LOGOUT, "normal");
                }),
                catchError(() => of(null))
            )
            .subscribe(() => {
                this.userService.currentUser = null;
                this.router.navigate(["/auth/login"]);
            });
    }
}
