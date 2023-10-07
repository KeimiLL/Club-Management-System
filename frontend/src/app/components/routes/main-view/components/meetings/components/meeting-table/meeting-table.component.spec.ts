import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../../shared/services/table.service";
import { MeetingsRootService } from "../../services/meetings-root.service";
import { MeetingTableComponent } from "./meeting-table.component";

class MockActivatedRoute {
    queryParams = of({});
}

describe("MeetingTableComponent", () => {
    let component: MeetingTableComponent;
    let fixture: ComponentFixture<MeetingTableComponent>;
    const mockEvent: PageEvent = { pageIndex: 0, pageSize: 2, length: 2 };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, MaterialModule, HttpClientModule],
            declarations: [],
            providers: [
                MatPaginator,
                SplitViewManagerService,
                {
                    provide: MeetingsRootService,
                    useValue: {
                        initData: () => null,
                        displayedColumns$: of([]),
                    },
                },
                { provide: ActivatedRoute, useClass: MockActivatedRoute },
                {
                    provide: TableService,
                    useValue: {
                        changePage: () => of(mockEvent.pageIndex),
                        capacity: 1,
                        totalItems$: of(1),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MeetingTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
