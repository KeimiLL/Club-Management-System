import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { Roles, ShortUser } from "../../../../../../shared/models/user.model";
import { TableService } from "../../../../../../shared/services/table.service";
import { UserService } from "../../../../../../shared/services/user.service";

@Injectable()
export class SettingsRootService {
    private readonly usersStore$ = new BehaviorSubject<ShortUser[]>([]);

    public set users(users: ShortUser[]) {
        this.usersStore$.next(users);
    }

    public get users$(): Observable<ShortUser[]> {
        return this.usersStore$.asObservable();
    }

    constructor(
        private readonly userService: UserService,
        private readonly table: TableService<ShortUser>
    ) {
        this.userService
            .getAllUsers()
            .pipe(
                tap((users) => {
                    this.users = users;
                })
            )
            .subscribe();
    }

    public changeUserRole(id: number, role: Roles): void {
        this.userService.updateRole(id, role).subscribe();
    }

    //   private refreshUsers$(): Observable<ShortUser[]> {
    //     return this.table
    //         .getCurrentPage(
    //             this.http.getMeetingsList(
    //                 this.table.currentPageIndex,
    //                 this.table.capacity
    //             )
    //         )
    //         .pipe(
    //             tap((meetings) => {
    //                 this.longMeetings = meetings;
    //                 this.minimizeLongMeetings();
    //             })
    //         );
    // }
}
