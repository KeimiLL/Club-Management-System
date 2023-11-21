import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
} from "@angular/material/dialog";

import { SchedulePopupFormsService } from "./schedule-popup-forms.service";
import { SchedulePopupRootService } from "./schedule-popup-root.service";

describe("SchedulePopupRootService", () => {
    let service: SchedulePopupRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule], // Import MatDialogModule here
            providers: [
                SchedulePopupRootService,
                SchedulePopupFormsService,
                { provide: MatDialogRef, useValue: {} },
                { provide: MatDialog, useValue: {} },
            ],
        });
        service = TestBed.inject(SchedulePopupRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
