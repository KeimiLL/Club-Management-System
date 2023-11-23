import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { ActivatedRouteQueryParams } from "../../../../../../shared/test-mocks/test-mocks";
import { TeamsRootService } from "./teams-root.service";

describe("TeamsRootService", () => {
    let teamsRootService: TeamsRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule],
            providers: [
                SplitViewManagerService,
                TableService,
                TeamsRootService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        teamsRootService = TestBed.inject(TeamsRootService);
    });

    it("should be created", () => {
        expect(teamsRootService).toBeTruthy();
    });
});
