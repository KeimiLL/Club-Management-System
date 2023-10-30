import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SquadTableComponent } from "./squad-table.component";

describe("SquadTableComponent", () => {
    let component: SquadTableComponent;
    let fixture: ComponentFixture<SquadTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SquadTableComponent],
        });
        fixture = TestBed.createComponent(SquadTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
