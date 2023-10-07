import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { MeetingsPopupHttpService } from "./meetings-popup-http.service";

describe("MeetingsPopupHttpService", () => {
    let mockService: MeetingsPopupHttpService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MeetingsPopupHttpService],
        });
        mockService = TestBed.inject(MeetingsPopupHttpService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should be created", () => {
        expect(mockService).toBeTruthy();
    });
});
