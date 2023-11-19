import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { SettingsRootService } from "../../services/settings-root.service";
import { ModifyComponent } from "./modify.component";

describe("ModifyComponent", () => {
    let component: ModifyComponent;
    let fixture: ComponentFixture<ModifyComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ModifyComponent,
                HttpClientTestingModule,
                MatSnackBarModule,
            ],
            providers: [SettingsRootService],
        });
        fixture = TestBed.createComponent(ModifyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
