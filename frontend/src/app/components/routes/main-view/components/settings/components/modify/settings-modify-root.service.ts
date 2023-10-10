import { Injectable } from "@angular/core";
import { FormArray, FormControl, Validators } from "@angular/forms";
import { BehaviorSubject, Observable, tap } from "rxjs";

import {
    Roles,
    ShortUser,
} from "../../../../../../../shared/models/user.model";
import { TableService } from "../../../../../../../shared/services/table.service";
import { UserService } from "../../../../../../../shared/services/user.service";

@Injectable()
export class SettingsModifyRootService {
    private readonly usersStore$ = new BehaviorSubject<ShortUser[]>([]);

    public passwordFormArray: FormArray<FormControl<string>> = new FormArray<
        FormControl<string>
    >([]);

    constructor(
        private readonly userService: UserService,
        private readonly table: TableService<ShortUser>
    ) {
        this.userService
            .getAllUsers()
            .pipe(
                tap((users) => {
                    this.users = users;
                    this.passwordFormArray.clear();
                    users.forEach(() => {
                        this.passwordFormArray.push(
                            new FormControl("", {
                                nonNullable: true,
                                validators: [
                                    Validators.required,
                                    Validators.minLength(8),
                                ],
                            })
                        );
                    });
                })
            )
            .subscribe();
    }

    public set users(users: ShortUser[]) {
        this.usersStore$.next(users);
    }

    public get users$(): Observable<ShortUser[]> {
        return this.usersStore$.asObservable();
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
