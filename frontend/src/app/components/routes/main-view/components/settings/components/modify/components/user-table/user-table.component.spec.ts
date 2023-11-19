import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { TableService } from "../../../../../../../../../shared/services/table.service";
import { SettingsRootService } from "../../../../services/settings-root.service";
import { ModifyUsersPopupService } from "../../services/modify-users-popup.service";
import { SettingsModifyRootService } from "../../services/settings-modify-root.service";
import { UserTableComponent } from "./user-table.component";

describe("UserTableComponent", () => {
    let component: UserTableComponent;
    let fixture: ComponentFixture<UserTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                UserTableComponent,
                HttpClientTestingModule,
                MatSnackBarModule,
            ],
            providers: [
                TableService,
                SettingsModifyRootService,
                ModifyUsersPopupService,
                SettingsRootService,
            ],
        });
        fixture = TestBed.createComponent(UserTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
