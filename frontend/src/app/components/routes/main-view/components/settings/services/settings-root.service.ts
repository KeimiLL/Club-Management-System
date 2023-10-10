import { Injectable } from "@angular/core";

import { UserService } from "../../../../../../shared/services/user.service";

@Injectable()
export class SettingsRootService {
    constructor(private readonly userService: UserService) {}

    public changeUsersPassword(id: number, new_password: string): void {
        this.userService
            .changePassword(id, {
                old_password: null,
                new_password,
            })
            .subscribe();
    }

    public changeSelfPassword(
        old_password: string,
        new_password: string
    ): void {
        if (this.userService.currentUser !== null) {
            this.userService
                .changePassword(this.userService.currentUser.id, {
                    old_password,
                    new_password,
                })
                .subscribe();
        }
    }
}
