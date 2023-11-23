import { TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { Meeting } from "../models/meeting.model";
import { ActivatedRouteQueryParams } from "../test-mocks/test-mocks";
import { SplitViewManagerService } from "./split-view-manager.service";

describe("SplitViewManagerService", () => {
    let splitViewManagerService: SplitViewManagerService<Meeting>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule],
            providers: [
                SplitViewManagerService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        splitViewManagerService = TestBed.inject(SplitViewManagerService);
    });

    it("should be created", () => {
        expect(splitViewManagerService).toBeTruthy();
    });
});
