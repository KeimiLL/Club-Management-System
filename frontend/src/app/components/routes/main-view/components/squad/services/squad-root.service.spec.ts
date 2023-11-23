import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { DropdownViewManagerService } from "../../../../../../shared/services/dropdown-view-manager.service";
import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { ActivatedRouteQueryParams } from "../../../../../../shared/test-mocks/test-mocks";
import { SquadRootService } from "./squad-root.service";

describe("SquadRootService", () => {
    let squadRootService: SquadRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule],
            providers: [
                DropdownViewManagerService,
                SplitViewManagerService,
                SquadRootService,
                TableService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });
        squadRootService = TestBed.inject(SquadRootService);
    });

    it("should be created", () => {
        expect(squadRootService).toBeTruthy();
    });
});
