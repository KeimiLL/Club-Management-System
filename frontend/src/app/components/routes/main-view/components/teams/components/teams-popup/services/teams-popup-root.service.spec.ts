import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";

import { TeamsPopupFormsService } from "./teams-popup-forms.service";
import { TeamsPopupRootService } from "./teams-popup-root.service";

describe("TeamsPopupRootService", () => {
    let teamsPopupRootService: TeamsPopupRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                TeamsPopupFormsService,
                TeamsPopupRootService,
                { provide: MatDialogRef, useValue: {} },
            ],
        });
        teamsPopupRootService = TestBed.inject(TeamsPopupRootService);
    });

    it("should be created", () => {
        expect(teamsPopupRootService).toBeTruthy();
    });
});
