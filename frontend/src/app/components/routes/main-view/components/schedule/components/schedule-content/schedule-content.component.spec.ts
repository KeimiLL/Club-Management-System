import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { DropdownViewManagerService } from "../../../../../../../shared/services/dropdown-view-manager.service";
import { ScheduleContentService } from "../../services/schedule-content.service";
import { ScheduleContentComponent } from "./schedule-content.component";

describe("ScheduleContentComponent", () => {
    let component: ScheduleContentComponent;
    let fixture: ComponentFixture<ScheduleContentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ScheduleContentComponent, HttpClientTestingModule],
            providers: [
                ScheduleContentService,
                DropdownViewManagerService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({}),
                    },
                },
            ],
        });
        fixture = TestBed.createComponent(ScheduleContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
