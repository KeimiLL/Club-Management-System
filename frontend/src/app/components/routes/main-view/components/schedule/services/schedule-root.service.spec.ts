import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { DropdownViewManagerService } from "../../../../../../shared/services/dropdown-view-manager.service";
import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { ActivatedRouteQueryParams } from "../../../../../../shared/test-mocks/test-mocks";
import { ScheduleRootService } from "./schedule-root.service";

describe("ScheduleRootService", () => {
    let scheduleRootService: ScheduleRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule],
            providers: [
                DropdownViewManagerService,
                TableService,
                SplitViewManagerService,
                ScheduleRootService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
                { provide: MatDialog, useValue: {} },
            ],
        });
        scheduleRootService = TestBed.inject(ScheduleRootService);
    });

    it("should be created", () => {
        expect(scheduleRootService).toBeTruthy();
    });
});
