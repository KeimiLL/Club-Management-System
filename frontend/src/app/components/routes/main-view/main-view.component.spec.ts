import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MainViewComponentComponent } from "./main-view.component";

describe("MainViewComponentComponent", () => {
    let component: MainViewComponentComponent;
    let fixture: ComponentFixture<MainViewComponentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MainViewComponentComponent],
        });
        fixture = TestBed.createComponent(MainViewComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
