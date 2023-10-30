import { TestBed } from "@angular/core/testing";

import { SquadRootService } from "./squad-root.service";

describe("SquadRootService", () => {
    let service: SquadRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SquadRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
