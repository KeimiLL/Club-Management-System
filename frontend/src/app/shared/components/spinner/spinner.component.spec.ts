import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LoaderService } from "../../services/loader.service";
import { SpinnerComponent } from "./spinner.component";

describe("SpinnerComponent", () => {
    let component: SpinnerComponent;
    let fixture: ComponentFixture<SpinnerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SpinnerComponent, BrowserAnimationsModule],
            providers: [LoaderService],
        });
        fixture = TestBed.createComponent(SpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
