import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, of, tap } from "rxjs";

import { BackendResponse } from "./../../../../../shared/models/misc.model";
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
                tap((response: BackendResponse) => {
                    this.userService.currentUser = null;
                    this.snack.showSnackBar(response.message, "normal");
                    this.router.navigate(["/auth/login"]);
                }),
                catchError(() => of(null))
            )
            .subscribe();
    }
}
