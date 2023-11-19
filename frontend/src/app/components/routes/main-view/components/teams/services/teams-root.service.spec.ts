import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { TeamsRootService } from "./teams-root.service";

describe("TeamsRootService", () => {
    let service: TeamsRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule],
            providers: [
                TeamsRootService,
                TableService,
                SplitViewManagerService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({}),
                    },
                },
            ],
        });
        service = TestBed.inject(TeamsRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
