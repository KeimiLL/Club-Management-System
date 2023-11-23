import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SectionHeaderComponent } from "./section-header.component";

describe("SectionHeaderComponent", () => {
    let fixture: ComponentFixture<SectionHeaderComponent>;
    let component: SectionHeaderComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SectionHeaderComponent],
        });

        fixture = TestBed.createComponent(SectionHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
