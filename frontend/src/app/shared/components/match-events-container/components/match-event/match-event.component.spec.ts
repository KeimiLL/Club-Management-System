import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";

import {
    MatchEvent,
    MatchEventType,
} from "../../../../models/match-event.model";
import { MatchEventComponent } from "./match-event.component";

describe("MatchEventComponent", () => {
    let component: MatchEventComponent;
    let fixture: ComponentFixture<MatchEventComponent>;
    const mockEvent: MatchEvent = {
        minute: 20,
        event_type: MatchEventType.Goal,
        description: "Test goal",
        is_own_event: true,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatIconModule, HttpClientModule],
            providers: [MatIconRegistry],
        });

        fixture = TestBed.createComponent(MatchEventComponent);
        component = fixture.componentInstance;
        component.event = mockEvent;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should display the event information", () => {
        const eventDescriptionElement = fixture.nativeElement.querySelector(
            ".event__description"
        );
        expect(eventDescriptionElement).toBeTruthy();
        expect(eventDescriptionElement.textContent).toContain(
            mockEvent.description
        );
    });
});
