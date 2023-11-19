import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { SquadComponent } from "./squad.component";

describe("SquadComponent", () => {
    let component: SquadComponent;
    let fixture: ComponentFixture<SquadComponent>;

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
                    useValue: {
                        queryParams: of({}),
                    },
                },
            ],
        });
        fixture = TestBed.createComponent(SquadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
