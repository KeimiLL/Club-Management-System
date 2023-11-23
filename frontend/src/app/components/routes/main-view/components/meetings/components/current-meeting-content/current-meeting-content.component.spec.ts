import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import {
    ActivatedRouteQueryParams,
    mockMeeting,
} from "./../../../../../../../shared/test-mocks/test-mocks";
import { CurrentMeetingContentComponent } from "./current-meeting-content.component";

describe("CurrentMeetingContentComponent", () => {
    let fixture: ComponentFixture<CurrentMeetingContentComponent>;
    let component: CurrentMeetingContentComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CurrentMeetingContentComponent, HttpClientTestingModule],
            providers: [
                SplitViewManagerService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        fixture = TestBed.createComponent(CurrentMeetingContentComponent);
        component = fixture.componentInstance;
        component.meeting = mockMeeting;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
