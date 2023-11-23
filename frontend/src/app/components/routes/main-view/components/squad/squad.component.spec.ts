import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";

import { ActivatedRouteQueryParams } from "../../../../../shared/test-mocks/test-mocks";
import { SquadComponent } from "./squad.component";

describe("SquadComponent", () => {
    let fixture: ComponentFixture<SquadComponent>;
    let component: SquadComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SquadComponent,
                HttpClientTestingModule,
                BrowserAnimationsModule,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        fixture = TestBed.createComponent(SquadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
