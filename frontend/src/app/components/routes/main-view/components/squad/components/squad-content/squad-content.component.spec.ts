import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SquadContentComponent } from "./squad-content.component";

describe("SquadContentComponent", () => {
    let component: SquadContentComponent;
    let fixture: ComponentFixture<SquadContentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SquadContentComponent],
        });
        fixture = TestBed.createComponent(SquadContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
