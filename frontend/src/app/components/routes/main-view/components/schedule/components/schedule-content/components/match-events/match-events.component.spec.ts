import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { DropdownViewManagerService } from "../../../../../../../../../shared/services/dropdown-view-manager.service";
import { SplitViewManagerService } from "../../../../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../../../../shared/services/table.service";
import { ActivatedRouteQueryParams } from "../../../../../../../../../shared/test-mocks/test-mocks";
import { ScheduleContentService } from "../../../../services/schedule-content.service";
import { ScheduleRootService } from "../../../../services/schedule-root.service";
import { MatchEventsComponent } from "./match-events.component";

describe("MatchEventsComponent", () => {
    let fixture: ComponentFixture<MatchEventsComponent>;
    let component: MatchEventsComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatchEventsComponent, HttpClientTestingModule],
            providers: [
                ScheduleContentService,
                ScheduleRootService,
                DropdownViewManagerService,
                TableService,
                SplitViewManagerService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        fixture = TestBed.createComponent(MatchEventsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
