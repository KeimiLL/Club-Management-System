import { ComponentFixture, TestBed } from "@angular/core/testing";

import { mockMatch } from "../../test-mocks/test-mocks";
import { ScoreComponent } from "./score.component";

describe("ScoreComponent", () => {
    let component: ScoreComponent;
    let fixture: ComponentFixture<ScoreComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ScoreComponent],
        });
        fixture = TestBed.createComponent(ScoreComponent);
        component = fixture.componentInstance;
        component.match = mockMatch;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
