import { TestBed } from "@angular/core/testing";

import { TeamsPopupFormsService } from "./teams-popup-forms.service";

describe("TeamsPopupFormsService", () => {
    let teamsPopupFormsService: TeamsPopupFormsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TeamsPopupFormsService],
        });

        teamsPopupFormsService = TestBed.inject(TeamsPopupFormsService);
    });

    it("should be created", () => {
        expect(teamsPopupFormsService).toBeTruthy();
    });
});
