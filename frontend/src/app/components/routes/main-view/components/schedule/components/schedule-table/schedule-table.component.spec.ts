import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";

import { DropdownViewManagerService } from "../../../../../../../shared/services/dropdown-view-manager.service";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../../shared/services/table.service";
import { ActivatedRouteQueryParams } from "../../../../../../../shared/test-mocks/test-mocks";
import { ScheduleContentService } from "../../services/schedule-content.service";
import { ScheduleRootService } from "../../services/schedule-root.service";
import { ScheduleTableComponent } from "./schedule-table.component";

describe("ScheduleTableComponent", () => {
    let fixture: ComponentFixture<ScheduleTableComponent>;
    let component: ScheduleTableComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ScheduleTableComponent,
                HttpClientTestingModule,
                BrowserAnimationsModule,
            ],
            providers: [
                SplitViewManagerService,
                TableService,
                DropdownViewManagerService,
                ScheduleRootService,
                ScheduleContentService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        fixture = TestBed.createComponent(ScheduleTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
