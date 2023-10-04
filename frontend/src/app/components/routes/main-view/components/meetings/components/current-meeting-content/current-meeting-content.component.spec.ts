import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CurrentMeetingContentComponent } from "./current-meeting-content.component";

describe("CurrentMeetingContentComponent", () => {
    let component: CurrentMeetingContentComponent;
    let fixture: ComponentFixture<CurrentMeetingContentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CurrentMeetingContentComponent],
        });
        fixture = TestBed.createComponent(CurrentMeetingContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
