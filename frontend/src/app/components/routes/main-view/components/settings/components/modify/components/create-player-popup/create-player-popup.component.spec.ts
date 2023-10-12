import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreatePlayerPopupComponent } from "./create-player-popup.component";

describe("CreatePlayerPopupComponent", () => {
    let component: CreatePlayerPopupComponent;
    let fixture: ComponentFixture<CreatePlayerPopupComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CreatePlayerPopupComponent],
        });
        fixture = TestBed.createComponent(CreatePlayerPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
