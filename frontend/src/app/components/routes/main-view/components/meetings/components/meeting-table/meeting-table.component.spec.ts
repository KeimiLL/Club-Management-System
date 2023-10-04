import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { MeetingTableComponent } from "./meeting-table.component";

class MockActivatedRoute {
    queryParams = of({});
}

describe("MeetingTableComponent", () => {
    let component: MeetingTableComponent;
    let fixture: ComponentFixture<MeetingTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, MaterialModule, HttpClientModule],
            declarations: [],
            providers: [
                MatPaginator,
                SplitViewManagerService,
                { provide: ActivatedRoute, useClass: MockActivatedRoute },
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
