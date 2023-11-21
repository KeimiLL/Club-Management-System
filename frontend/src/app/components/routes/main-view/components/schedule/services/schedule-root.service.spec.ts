import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { DropdownViewManagerService } from "../../../../../../shared/services/dropdown-view-manager.service";
import { ScheduleRootService } from "./schedule-root.service";

describe("ScheduleRootService", () => {
    let service: ScheduleRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule, HttpClientTestingModule],
            providers: [
                ScheduleRootService,
                DropdownViewManagerService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({}),
                    },
                },
                { provide: MatDialog, useValue: {} },
            ],
        });
        service = TestBed.inject(ScheduleRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
