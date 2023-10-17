import { TestBed } from "@angular/core/testing";

import { TeamsPopupHttpService } from "./teams-popup-http.service";

describe("TeamsPopupHttpService", () => {
    let service: TeamsPopupHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TeamsPopupHttpService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
