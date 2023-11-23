import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ButtonContainerComponent } from "./button-container.component";

describe("ButtonContainerComponent", () => {
    let fixture: ComponentFixture<ButtonContainerComponent>;
    let component: ButtonContainerComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ButtonContainerComponent],
        });

        fixture = TestBed.createComponent(ButtonContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
