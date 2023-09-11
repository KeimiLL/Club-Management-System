import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AutoTableComponent } from "./auto-table.component";

describe("AutoTableComponent", () => {
    let component: AutoTableComponent<T>;
    let fixture: ComponentFixture<AutoTableComponent<T>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AutoTableComponent],
        });
        fixture = TestBed.createComponent(AutoTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
