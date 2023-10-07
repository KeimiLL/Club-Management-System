import { TestBed } from "@angular/core/testing";

import { MaterialModule } from "../../../shared/modules/material.module";
import { FooterComponent } from "./footer.component";

describe("FooterComponent", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule],
        });
    });

    it("should be created", () => {
        const fixture = TestBed.createComponent(FooterComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
