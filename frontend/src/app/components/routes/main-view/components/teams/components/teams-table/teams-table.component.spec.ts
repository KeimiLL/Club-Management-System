import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../../shared/services/table.service";
import { TeamsTableComponent } from "./teams-table.component";

describe("TeamsTableComponent", () => {
    let component: TeamsTableComponent;
    let fixture: ComponentFixture<TeamsTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TeamsTableComponent],
            providers: [
                SplitViewManagerService,
                TableService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({}),
                    },
                },
            ],
        });
        fixture = TestBed.createComponent(TeamsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
