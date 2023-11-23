import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InfoComponent } from "./info.component";

describe("InfoComponent", () => {
    let fixture: ComponentFixture<InfoComponent>;
    let component: InfoComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [InfoComponent],
        });

        fixture = TestBed.createComponent(InfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
