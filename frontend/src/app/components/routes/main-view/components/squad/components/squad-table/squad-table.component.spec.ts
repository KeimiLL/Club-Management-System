import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";

import { DropdownViewManagerService } from "../../../../../../../shared/services/dropdown-view-manager.service";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../../shared/services/table.service";
import { ActivatedRouteQueryParams } from "../../../../../../../shared/test-mocks/test-mocks";
import { SquadRootService } from "../../services/squad-root.service";
import { SquadTableComponent } from "./squad-table.component";

describe("SquadTableComponent", () => {
    let fixture: ComponentFixture<SquadTableComponent>;
    let component: SquadTableComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,

                HttpClientTestingModule,
                SquadTableComponent,
            ],
            providers: [
                DropdownViewManagerService,
                SplitViewManagerService,
                SquadRootService,
                TableService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });
        fixture = TestBed.createComponent(SquadTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
