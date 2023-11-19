import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SettingsRootService } from "../../services/settings-root.service";
import { GeneralComponent } from "./general.component";

describe("GeneralComponent", () => {
    let component: GeneralComponent;
    let fixture: ComponentFixture<GeneralComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                GeneralComponent,
                HttpClientTestingModule,
                MatSnackBarModule,
                BrowserAnimationsModule,
            ],
            providers: [SettingsRootService],
        });
        fixture = TestBed.createComponent(GeneralComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
