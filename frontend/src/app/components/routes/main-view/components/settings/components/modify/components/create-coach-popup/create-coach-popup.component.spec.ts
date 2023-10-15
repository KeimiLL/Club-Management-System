import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateCoachPopupComponent } from "./create-coach-popup.component";

describe("CreateCoachPopupComponent", () => {
    let component: CreateCoachPopupComponent;
    let fixture: ComponentFixture<CreateCoachPopupComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CreateCoachPopupComponent],
        });
        fixture = TestBed.createComponent(CreateCoachPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
