import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { of } from "rxjs";

import { Roles } from "../../../../../../../shared/models/user.model";
import { UserService } from "../../../../../../../shared/services/user.service";
import { AddMeetingPopupComponent } from "./add-meeting-popup.component";

describe("AddMeetingPopupComponent", () => {
    let component: AddMeetingPopupComponent;
    let fixture: ComponentFixture<AddMeetingPopupComponent>;

    const userServiceMock = {
        currentUser: {
            full_name: "Janusz Tracz",
            email: "janusz.tracz@plebania.com",
            role: Roles.Admin,
            id: 1,
        },
        getAllUsers: () => of(null),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                AddMeetingPopupComponent,
                MatSnackBarModule,
            ],
            providers: [
                { provide: UserService, useValue: userServiceMock },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
            ],
        });
        fixture = TestBed.createComponent(AddMeetingPopupComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
