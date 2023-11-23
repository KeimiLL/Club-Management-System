import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { TableService } from "../../../../../../../../../shared/services/table.service";
import { SettingsRootService } from "../../../../services/settings-root.service";
import { ModifyUsersPopupService } from "../../services/modify-users-popup.service";
import { SettingsModifyRootService } from "../../services/settings-modify-root.service";
import { UserTableComponent } from "./user-table.component";

describe("UserTableComponent", () => {
    let fixture: ComponentFixture<UserTableComponent>;
    let component: UserTableComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule,
                UserTableComponent,
            ],
            providers: [
                ModifyUsersPopupService,
                SettingsRootService,
                SettingsModifyRootService,
                TableService,
            ],
        });

        fixture = TestBed.createComponent(UserTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
