import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { SquadContentComponent } from "./squad-content.component";

describe("SquadContentComponent", () => {
    let component: SquadContentComponent;
    let fixture: ComponentFixture<SquadContentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SquadContentComponent, HttpClientTestingModule],
            providers: [
                SplitViewManagerService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({}),
                    },
                },
            ],
        });
        fixture = TestBed.createComponent(SquadContentComponent);
        component = fixture.componentInstance;
        component.player = {
            date_of_joining: "2023-11-19",
            date_of_birth: "2023-11-19",
            height: 190,
            weight: 90,
            user_id: 1,
            team_id: 1,
            notes: "notes",
            user_full_name: "Full Name",
            is_injured: false,
            diet: "diet",
        };
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
