import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { DropdownViewManagerService } from "../../../../../../shared/services/dropdown-view-manager.service";
import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { SquadRootService } from "./squad-root.service";

describe("SquadRootService", () => {
    let service: SquadRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule],
            providers: [
                SquadRootService,
                SplitViewManagerService,
                TableService,
                DropdownViewManagerService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({}),
                    },
                },
            ],
        });
        service = TestBed.inject(SquadRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
