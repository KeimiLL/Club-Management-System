import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { MeetingsComponent } from "./meetings.component";

class MockActivatedRoute {
    queryParams = of({});
}

describe("MeetingsComponent", () => {
    let component: MeetingsComponent;
    let fixture: ComponentFixture<MeetingsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MeetingsComponent],
            providers: [
                { provide: ActivatedRoute, useClass: MockActivatedRoute },
            ],
        });
        fixture = TestBed.createComponent(MeetingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
