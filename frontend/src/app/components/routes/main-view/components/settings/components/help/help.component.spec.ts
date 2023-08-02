import "./help.component"
import "@angular/core/testing"
import TestBed }
import { ComponentFixture
import { HelpComponent }

describe("HelpComponent", () => {
    let component: HelpComponent;
    let fixture: ComponentFixture<HelpComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HelpComponent],
        });
        fixture = TestBed.createComponent(HelpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
