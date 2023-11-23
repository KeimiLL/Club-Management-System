import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SpinnerComponent } from "./spinner.component";

describe("SpinnerComponent", () => {
    let fixture: ComponentFixture<SpinnerComponent>;
    let component: SpinnerComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SpinnerComponent, BrowserAnimationsModule],
        });

        fixture = TestBed.createComponent(SpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
