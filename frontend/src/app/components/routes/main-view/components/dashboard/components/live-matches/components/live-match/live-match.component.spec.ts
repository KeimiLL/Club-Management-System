import { ComponentFixture, TestBed } from "@angular/core/testing";

import { mockMatch } from "../../../../../../../../../shared/test-mocks/test-mocks";
import { LiveMatchComponent } from "./live-match.component";

describe("LiveMatchComponent", () => {
    let component: LiveMatchComponent;
    let fixture: ComponentFixture<LiveMatchComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LiveMatchComponent],
        });
        fixture = TestBed.createComponent(LiveMatchComponent);
        component = fixture.componentInstance;
        component.match = mockMatch;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
