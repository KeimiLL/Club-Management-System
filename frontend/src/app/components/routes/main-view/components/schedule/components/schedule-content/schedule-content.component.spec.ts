import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { DropdownViewManagerService } from "../../../../../../../shared/services/dropdown-view-manager.service";
import { ActivatedRouteQueryParams } from "../../../../../../../shared/test-mocks/test-mocks";
import { ScheduleContentService } from "../../services/schedule-content.service";
import { ScheduleContentComponent } from "./schedule-content.component";

describe("ScheduleContentComponent", () => {
    let fixture: ComponentFixture<ScheduleContentComponent>;
    let component: ScheduleContentComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ScheduleContentComponent],
            providers: [
                DropdownViewManagerService,
                ScheduleContentService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        fixture = TestBed.createComponent(ScheduleContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
