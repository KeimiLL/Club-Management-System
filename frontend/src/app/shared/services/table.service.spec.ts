import { TestBed } from "@angular/core/testing";

import { TableService } from "./table.service";

describe("TableService", () => {
    let service: TableService<unknown>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TableService],
        });

        service = TestBed.inject(TableService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
