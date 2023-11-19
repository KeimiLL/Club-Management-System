import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { MenuRootService } from "../../menu-root.service";

@Component({
    selector: "app-logout",
    template: "",
})
class MockLogoutComponent {
    @Input() public isCollapsed = false;
}

describe("LogoutComponent", () => {
    let fixture: ComponentFixture<MockLogoutComponent>;
    let component: MockLogoutComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MockLogoutComponent],
            imports: [CommonModule, MaterialModule],
            providers: [MenuRootService],
        });
        fixture = TestBed.createComponent(MockLogoutComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
