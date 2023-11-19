import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { of } from "rxjs";

import { UserService } from "../../../../../../../shared/api/user.service";
import { Meeting } from "../../../../../../../shared/models/meeting.model";
import { Roles } from "../../../../../../../shared/models/user.model";
import { MeetingPopupComponent } from "./meeting-popup.component";

const adminUser = {
    full_name: "admin",
    role: Roles.Admin,
    id: 1,
    email: "admin@cms.com",
};

const viewerUser = {
    full_name: "viewer",

    id: 2,
    role: Roles.Viewer,
    email: "admin@cms.com",
};

describe("MeetingPopupComponent", () => {
    let component: MeetingPopupComponent;
    let fixture: ComponentFixture<MeetingPopupComponent>;

    const userServiceMock = {
        adminUser,
        getAllUsers: () => of(null),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MeetingPopupComponent,
                MatSnackBarModule,
            ],
            providers: [
                { provide: UserService, useValue: userServiceMock },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        id: 1,
                        notes: "notes",
                        name: "name",
                        date: "2023-11-19",
                        created_by_user: adminUser,
                        users: [viewerUser],
                    } as Meeting,
                },
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
            ],
        });
        fixture = TestBed.createComponent(MeetingPopupComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
