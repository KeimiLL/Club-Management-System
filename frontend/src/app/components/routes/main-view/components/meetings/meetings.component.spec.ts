import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";

import { SpinnerComponent } from "../../../../../shared/components/spinner/spinner.component";
import { ActivatedRouteQueryParams } from "../../../../../shared/test-mocks/test-mocks";
import { MeetingsComponent } from "./meetings.component";

describe("MeetingsComponent", () => {
    let fixture: ComponentFixture<MeetingsComponent>;
    let component: MeetingsComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                HttpClientTestingModule,
                MeetingsComponent,
                SpinnerComponent,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        fixture = TestBed.createComponent(MeetingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
