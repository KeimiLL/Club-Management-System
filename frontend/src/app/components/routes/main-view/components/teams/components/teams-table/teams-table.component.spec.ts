import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../../shared/services/table.service";
import { ActivatedRouteQueryParams } from "../../../../../../../shared/test-mocks/test-mocks";
import { TeamsTableComponent } from "./teams-table.component";

describe("TeamsTableComponent", () => {
    let fixture: ComponentFixture<TeamsTableComponent>;
    let component: TeamsTableComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TeamsTableComponent],
            providers: [
                SplitViewManagerService,
                TableService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        fixture = TestBed.createComponent(TeamsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
