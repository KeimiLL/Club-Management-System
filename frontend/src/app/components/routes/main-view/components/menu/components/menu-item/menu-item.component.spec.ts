import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";

import { MainMenuItem } from "../../../../../../../shared/models/misc.model";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";

@Component({
    selector: "app-menu-item",
    template: "<div></div>",
})
class MockMenuItemComponent {
    @Input() item: MainMenuItem;
    @Input() isCollapsed: boolean;
}

xdescribe("MenuItemComponent", () => {
    let fixture: ComponentFixture<MockMenuItemComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MockMenuItemComponent],
            imports: [CommonModule, RouterModule, MaterialModule],
        });

        fixture = TestBed.createComponent(MockMenuItemComponent);
    });

    it("should be created", () => {
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
