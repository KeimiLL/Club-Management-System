import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { ActivatedRouteParamMap } from "../../../../../../../shared/test-mocks/test-mocks";
import { MenuItemComponent } from "./menu-item.component";

describe("MenuItemComponent", () => {
    let fixture: ComponentFixture<MenuItemComponent>;
    let component: MenuItemComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ActivatedRoute, useClass: ActivatedRouteParamMap },
            ],
        });

        fixture = TestBed.createComponent(MenuItemComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
