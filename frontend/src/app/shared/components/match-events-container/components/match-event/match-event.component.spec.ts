import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

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
    let matIconRegistry: MatIconRegistry;
    let domSanitizer: DomSanitizer;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatIconModule, HttpClientModule],
            providers: [MatIconRegistry],
        });

        fixture = TestBed.createComponent(MatchEventComponent);
        component = fixture.componentInstance;
        component.event = mockEvent;

        matIconRegistry = TestBed.inject(MatIconRegistry);
        domSanitizer = TestBed.inject(DomSanitizer);

        spyOn(matIconRegistry, "addSvgIcon");
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

    it("should display proper event icon", () => {
        const eventIconElement =
            fixture.nativeElement.querySelector(".event__icon");

        expect(eventIconElement).toBeTruthy();

        const matIconElement =
            eventIconElement.querySelector(".event__icon__goal");

        expect(matIconElement).toBeTruthy();
        expect(matIconElement.getAttribute("svgIcon")).toContain("goal-icon");
    });

    it("should add the goal icon to MatIconRegistry", () => {
        expect(matIconRegistry.addSvgIcon).toHaveBeenCalledWith(
            "goal-icon",
            domSanitizer.bypassSecurityTrustResourceUrl(
                "../../../../../../assets/icons/soccer_ball.svg"
            )
        );
    });

    it("should display the event time", () => {
        const eventTimeElement =
            fixture.nativeElement.querySelector(".event__time");
        expect(eventTimeElement).toBeTruthy();
        expect(eventTimeElement.textContent).toContain(mockEvent.minute);
    });
});
