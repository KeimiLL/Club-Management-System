import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { ActivatedRouteQueryParams } from "../../../../../shared/test-mocks/test-mocks";
import { TeamsComponent } from "./teams.component";

describe("TeamsComponent", () => {
    let fixture: ComponentFixture<TeamsComponent>;
    let component: TeamsComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TeamsComponent, HttpClientTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        fixture = TestBed.createComponent(TeamsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
