import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { DropdownViewManagerService } from "../../../../../../../shared/services/dropdown-view-manager.service";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../../shared/services/table.service";
import { SquadRootService } from "../../services/squad-root.service";
import { SquadTableComponent } from "./squad-table.component";

describe("SquadTableComponent", () => {
    let component: SquadTableComponent;
    let fixture: ComponentFixture<SquadTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SquadTableComponent,
                HttpClientTestingModule,
                BrowserAnimationsModule,
            ],
            providers: [
                SplitViewManagerService,
                TableService,
                SquadRootService,
                DropdownViewManagerService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({}),
                    },
                },
            ],
        });
        fixture = TestBed.createComponent(SquadTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
