import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SettingsRootService } from "../../services/settings-root.service";
import { GeneralComponent } from "./general.component";

describe("GeneralComponent", () => {
    let fixture: ComponentFixture<GeneralComponent>;
    let component: GeneralComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                GeneralComponent,
                HttpClientTestingModule,
                MatSnackBarModule,
            ],
            providers: [SettingsRootService],
        });

        fixture = TestBed.createComponent(GeneralComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
