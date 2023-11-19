import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { DropdownViewManagerService } from "./dropdown-view-manager.service";

describe("DropdownViewManagerService", () => {
    let service: DropdownViewManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                DropdownViewManagerService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({}),
                    },
                },
            ],
        });
        service = TestBed.inject(DropdownViewManagerService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
