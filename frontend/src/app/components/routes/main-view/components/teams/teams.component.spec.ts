import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { TeamsComponent } from "./teams.component";

describe("TeamsComponent", () => {
    let component: TeamsComponent;
    let fixture: ComponentFixture<TeamsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TeamsComponent, HttpClientTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({}),
                    },
                },
            ],
        });
        fixture = TestBed.createComponent(TeamsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
