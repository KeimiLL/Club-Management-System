import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { DropdownViewManagerService } from "../../../../../../../../../shared/services/dropdown-view-manager.service";
import { ActivatedRouteQueryParams } from "../../../../../../../../../shared/test-mocks/test-mocks";
import { ScoreComponent } from "./score.component";

describe("ScoreComponent", () => {
    let fixture: ComponentFixture<ScoreComponent>;
    let component: ScoreComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ScoreComponent],
            providers: [
                DropdownViewManagerService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });
        fixture = TestBed.createComponent(ScoreComponent);
        component = fixture.componentInstance;
        component.score = {
            opponent: "opponent",
            is_home: true,
            goals_scored: 1,
            goals_conceded: 2,
        };
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
