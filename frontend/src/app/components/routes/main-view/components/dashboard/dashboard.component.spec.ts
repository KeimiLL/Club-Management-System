import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardComponent } from "./dashboard.component";

describe("DashboardComponent", () => {
    let fixture: ComponentFixture<DashboardComponent>;
    let component: DashboardComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DashboardComponent],
        });

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
