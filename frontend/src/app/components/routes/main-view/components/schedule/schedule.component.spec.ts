import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { ActivatedRouteQueryParams } from "../../../../../shared/test-mocks/test-mocks";
import { ScheduleComponent } from "./schedule.component";

describe("ScheduleComponent", () => {
    let fixture: ComponentFixture<ScheduleComponent>;
    let component: ScheduleComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ScheduleComponent, HttpClientTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        fixture = TestBed.createComponent(ScheduleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
