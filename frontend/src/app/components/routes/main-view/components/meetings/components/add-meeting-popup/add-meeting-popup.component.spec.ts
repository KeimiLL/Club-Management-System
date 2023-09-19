import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddMeetingPopupComponent } from "./add-meeting-popup.component";

describe("AddMeetingPopupComponent", () => {
    let component: AddMeetingPopupComponent;
    let fixture: ComponentFixture<AddMeetingPopupComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AddMeetingPopupComponent],
        });
        fixture = TestBed.createComponent(AddMeetingPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
