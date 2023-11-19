import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";

import { TeamsPopupFormsService } from "./teams-popup-forms.service";
import { TeamsPopupRootService } from "./teams-popup-root.service";

describe("TeamsPopupRootService", () => {
    let service: TeamsPopupRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                TeamsPopupRootService,
                TeamsPopupFormsService,
                { provide: MatDialogRef, useValue: {} },
            ],
        });
        service = TestBed.inject(TeamsPopupRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
