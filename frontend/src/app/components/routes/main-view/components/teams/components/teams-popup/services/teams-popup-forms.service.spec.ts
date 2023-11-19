import { TestBed } from "@angular/core/testing";

import { TeamsPopupFormsService } from "./teams-popup-forms.service";

describe("TeamsPopupFormsService", () => {
    let service: TeamsPopupFormsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TeamsPopupFormsService],
        });
        service = TestBed.inject(TeamsPopupFormsService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
