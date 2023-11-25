import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { DropdownViewManagerService } from "../../../../../../../shared/services/dropdown-view-manager.service";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import {
    ActivatedRouteQueryParams,
    mockMatch,
} from "../../../../../../../shared/test-mocks/test-mocks";
import { ScheduleContentService } from "../../services/schedule-content.service";
import { ScheduleContentComponent } from "./schedule-content.component";

describe("ScheduleContentComponent", () => {
    let fixture: ComponentFixture<ScheduleContentComponent>;
    let component: ScheduleContentComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ScheduleContentComponent],
            providers: [
                DropdownViewManagerService,
                SplitViewManagerService,
                ScheduleContentService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ScheduleContentComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        component.match = mockMatch;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
