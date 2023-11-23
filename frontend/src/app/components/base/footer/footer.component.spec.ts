import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MaterialModule } from "../../../shared/modules/material.module";
import { FooterComponent } from "./footer.component";

describe("FooterComponent", () => {
    let fixture: ComponentFixture<FooterComponent>;
    let component: FooterComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule],
        });

        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
