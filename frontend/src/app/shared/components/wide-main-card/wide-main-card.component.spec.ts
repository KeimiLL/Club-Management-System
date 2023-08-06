import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WideMainCardComponent } from "./wide-main-card.component";

describe("WideMainCardComponent", () => {
    let component: WideMainCardComponent;
    let fixture: ComponentFixture<WideMainCardComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [WideMainCardComponent],
        });
        fixture = TestBed.createComponent(WideMainCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
