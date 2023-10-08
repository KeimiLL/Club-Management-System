import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { SpinnerComponent } from "../../../../../shared/components/spinner/spinner.component";
import { LoaderService } from "../../../../../shared/services/loader.service";
import { MeetingsComponent } from "./meetings.component";

class MockActivatedRoute {
    queryParams = of({});
}

describe("MeetingsComponent", () => {
    let component: MeetingsComponent;
    let fixture: ComponentFixture<MeetingsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MeetingsComponent,
                SpinnerComponent,
                BrowserAnimationsModule,
            ],
            providers: [
                { provide: ActivatedRoute, useClass: MockActivatedRoute },
                LoaderService,
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
