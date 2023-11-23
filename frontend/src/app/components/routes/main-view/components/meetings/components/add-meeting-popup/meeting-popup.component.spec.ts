import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { of } from "rxjs";

import { UserService } from "../../../../../../../shared/api/user.service";
import { mockMeeting } from "../../../../../../../shared/test-mocks/test-mocks";
import { MeetingPopupComponent } from "./meeting-popup.component";

describe("MeetingPopupComponent", () => {
    let component: MeetingPopupComponent;
    let fixture: ComponentFixture<MeetingPopupComponent>;
    let mockUserService: Partial<UserService>;

    beforeEach(() => {
        mockUserService = {
            getAllUsers: () => of([]),
        };

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule,
                MeetingPopupComponent,
            ],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: mockMeeting,
                },
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
                { provide: UserService, useValue: mockUserService },
            ],
        });

        fixture = TestBed.createComponent(MeetingPopupComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
