import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { MenuRootService } from "../../menu-root.service";
import { LogoutComponent } from "./logout.component";

describe("LogoutComponent", () => {
    let fixture: ComponentFixture<LogoutComponent>;
    let component: LogoutComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule],
            providers: [MenuRootService],
        });

        fixture = TestBed.createComponent(LogoutComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
