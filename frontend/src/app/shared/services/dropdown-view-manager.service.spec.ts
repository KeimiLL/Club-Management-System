import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { ActivatedRouteQueryParams } from "../test-mocks/test-mocks";
import { DropdownViewManagerService } from "./dropdown-view-manager.service";

describe("DropdownViewManagerService", () => {
    let dropdownViewManagerService: DropdownViewManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                DropdownViewManagerService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });
        dropdownViewManagerService = TestBed.inject(DropdownViewManagerService);
    });

    it("should be created", () => {
        expect(dropdownViewManagerService).toBeTruthy();
    });
});
