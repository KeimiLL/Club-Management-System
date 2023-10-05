import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { of } from "rxjs";

import { LongMeeting } from "../../../../../../shared/models/meetings.model";
import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { MeetingsHttpService } from "./meetings-http.service";
import { MeetingsRootService } from "./meetings-root.service";

const mockLongMeeting: LongMeeting[] = [];

describe("MeetingsRootService", () => {
    let mockService: MeetingsRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule],
            providers: [
                MeetingsRootService,
                MeetingsHttpService,
                {
                    provide: TableService,
                    useValue: {
                        getCurrentPage: () => of(mockLongMeeting),
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
        mockService = TestBed.inject(MeetingsRootService);
    });

    it("should be created", () => {
        expect(mockService).toBeTruthy();
    });
});
