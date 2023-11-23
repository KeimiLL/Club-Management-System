import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HelpComponent } from "./help.component";

describe("HelpComponent", () => {
    let fixture: ComponentFixture<HelpComponent>;
    let component: HelpComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HelpComponent],
        });

        fixture = TestBed.createComponent(HelpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
