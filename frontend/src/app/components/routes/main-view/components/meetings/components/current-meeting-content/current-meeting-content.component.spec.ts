import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Meeting } from "../../../../../../../shared/models/meetings.model";
import {
    Roles,
    ShortUser,
} from "../../../../../../../shared/models/user.model";
import { CurrentMeetingContentComponent } from "./current-meeting-content.component";

const mockShortUser: ShortUser = {
    full_name: "Janusz Tracz",
    id: 1,
    role: Roles.Admin,
};
const mockMeeting: Meeting = {
    notes: null,
    name: "xyz",
    date: "123",
    id: 1,
    created_by_user: mockShortUser,
    users: [mockShortUser],
};

describe("CurrentMeetingContentComponent", () => {
    let component: CurrentMeetingContentComponent;
    let fixture: ComponentFixture<CurrentMeetingContentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, CurrentMeetingContentComponent],
        });
        fixture = TestBed.createComponent(CurrentMeetingContentComponent);
        component = fixture.componentInstance;
        component.meeting = mockMeeting;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
