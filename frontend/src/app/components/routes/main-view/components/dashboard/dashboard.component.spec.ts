import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchEventHttpService } from "../../../../../shared/api/match-event-http.service";
import { MatchesHttpService } from "../../../../../shared/api/matches-http.service";
import { DashboardComponent } from "./dashboard.component";

describe("DashboardComponent", () => {
    let fixture: ComponentFixture<DashboardComponent>;
    let component: DashboardComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DashboardComponent, HttpClientTestingModule],
            providers: [MatchesHttpService, MatchEventHttpService],
        });

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
