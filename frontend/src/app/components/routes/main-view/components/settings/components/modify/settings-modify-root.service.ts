import { Injectable } from "@angular/core";
import { FormArray, FormControl, Validators } from "@angular/forms";
import { BehaviorSubject, Observable, switchMap, tap } from "rxjs";

import {
    Roles,
    UserForAdmin,
} from "../../../../../../../shared/models/user.model";
import { TableService } from "../../../../../../../shared/services/table.service";
import { UserService } from "../../../../../../../shared/services/user.service";
import { DestroyClass } from "../../../../../../../shared/utils/destroyClass";

@Injectable()
export class SettingsModifyRootService extends DestroyClass {
    private readonly usersStore$ = new BehaviorSubject<UserForAdmin[]>([]);

    public passwordFormArray: FormArray<FormControl<string>> = new FormArray<
        FormControl<string>
    >([]);

    constructor(
        private readonly userService: UserService,
        private readonly table: TableService<UserForAdmin>
    ) {
        super();
        this.initData();
    }

    public set users(users: UserForAdmin[]) {
        this.usersStore$.next(users);
    }

    public get users$(): Observable<UserForAdmin[]> {
        return this.usersStore$.asObservable();
    }

    public changeUserRole(id: number, role: Roles): void {
        this.userService
            .updateRole(id, role)
            .pipe(
                switchMap(() => this.refreshUsers$()),
                this.untilDestroyed()
            )
            .subscribe();
    }

    private initData(): void {
        this.table.currentPageIndex$
            .pipe(
                switchMap(() => this.refreshUsers$()),
                this.untilDestroyed()
            )
            .subscribe();
    }

    private refreshUsers$(): Observable<UserForAdmin[]> {
        return this.table
            .getCurrentPage(
                this.userService.getUsersWithPagination(
                    this.table.currentPageIndex,
                    this.table.capacity
                )
            )
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
            );
    }
}
