import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchEventsContainerComponent } from "./match-events-container.component";

describe("MatchEventsContainerComponent", () => {
    let component: MatchEventsContainerComponent;
    let fixture: ComponentFixture<MatchEventsContainerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatchEventsContainerComponent],
        });
        fixture = TestBed.createComponent(MatchEventsContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
