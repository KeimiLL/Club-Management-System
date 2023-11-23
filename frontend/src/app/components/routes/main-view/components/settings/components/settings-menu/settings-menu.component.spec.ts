import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SettingsMenuComponent } from "./settings-menu.component";

describe("SettingsMenuComponent", () => {
    let fixture: ComponentFixture<SettingsMenuComponent>;
    let component: SettingsMenuComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        fixture = TestBed.createComponent(SettingsMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created the component", () => {
        expect(component).toBeTruthy();
    });
});
