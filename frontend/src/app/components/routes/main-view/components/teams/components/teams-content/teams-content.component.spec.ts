import { ComponentFixture, TestBed } from "@angular/core/testing";

import { mockTeam } from "../../../../../../../shared/test-mocks/test-mocks";
import { TeamsContentComponent } from "./teams-content.component";

describe("TeamsContentComponent", () => {
    let fixture: ComponentFixture<TeamsContentComponent>;
    let component: TeamsContentComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TeamsContentComponent],
        });

        fixture = TestBed.createComponent(TeamsContentComponent);
        component = fixture.componentInstance;
        component.team = mockTeam;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
