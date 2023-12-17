import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LiveMatchesComponent } from "./live-matches.component";
import { LiveMatchesRootService } from "./services/live-matches-root.service";

describe("LiveMatchesComponent", () => {
    let component: LiveMatchesComponent;
    let fixture: ComponentFixture<LiveMatchesComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LiveMatchesComponent, HttpClientTestingModule],
            providers: [LiveMatchesRootService],
        });
        fixture = TestBed.createComponent(LiveMatchesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
