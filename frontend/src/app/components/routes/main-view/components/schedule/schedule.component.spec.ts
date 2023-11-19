import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { ScheduleComponent } from "./schedule.component";

describe("ScheduleComponent", () => {
    let component: ScheduleComponent;
    let fixture: ComponentFixture<ScheduleComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ScheduleComponent, HttpClientTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({}),
                    },
                },
            ],
        });
        fixture = TestBed.createComponent(ScheduleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
