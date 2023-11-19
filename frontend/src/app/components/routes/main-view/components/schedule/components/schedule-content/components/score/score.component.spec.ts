import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { DropdownViewManagerService } from "../../../../../../../../../shared/services/dropdown-view-manager.service";
import { ScoreComponent } from "./score.component";

describe("ScoreComponent", () => {
    let component: ScoreComponent;
    let fixture: ComponentFixture<ScoreComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ScoreComponent, HttpClientTestingModule],
            providers: [
                DropdownViewManagerService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({}),
                    },
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

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
