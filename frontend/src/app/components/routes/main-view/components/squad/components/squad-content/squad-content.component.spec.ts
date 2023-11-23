import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import {
    ActivatedRouteQueryParams,
    mockPlayer,
} from "../../../../../../../shared/test-mocks/test-mocks";
import { SquadContentComponent } from "./squad-content.component";

describe("SquadContentComponent", () => {
    let fixture: ComponentFixture<SquadContentComponent>;
    let component: SquadContentComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, SquadContentComponent],
            providers: [
                SplitViewManagerService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        fixture = TestBed.createComponent(SquadContentComponent);
        component = fixture.componentInstance;
        component.player = mockPlayer;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
