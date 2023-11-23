import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WideCardHeaderComponent } from "./wide-card-header.component";

describe("WideCardHeaderComponent", () => {
    let fixture: ComponentFixture<WideCardHeaderComponent>;
    let component: WideCardHeaderComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [WideCardHeaderComponent],
        });

        fixture = TestBed.createComponent(WideCardHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
