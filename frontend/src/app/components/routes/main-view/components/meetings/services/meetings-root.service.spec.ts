import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { of } from "rxjs";

import { MeetingsHttpService } from "../../../../../../shared/api/meetings-http.service";
import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { MeetingsRootService } from "./meetings-root.service";

describe("MeetingsRootService", () => {
    let meetingsRootService: MeetingsRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule],
            providers: [
                MeetingsHttpService,
                MeetingsRootService,
                {
                    provide: TableService,
                    useValue: {
                        refreshTableItems$: () => of([]),
                        currentPageIndex$: of(1),
                        currentPageIndex: 1,
                        capacity: 1,
                    },
                },
                {
                    provide: SplitViewManagerService,
                    useValue: {
                        currentId$: of(null),
                        isDetail$: of(true),
                    },
                },
            ],
        });

        meetingsRootService = TestBed.inject(MeetingsRootService);
    });

    it("should be created", () => {
        expect(meetingsRootService).toBeTruthy();
    });
});
