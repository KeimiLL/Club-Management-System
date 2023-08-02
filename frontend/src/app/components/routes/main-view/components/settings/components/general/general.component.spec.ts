import "./general.component"
import "@angular/core/testing"
import TestBed }
import { ComponentFixture
import { GeneralComponent }

describe("GeneralComponent", () => {
    let component: GeneralComponent;
    let fixture: ComponentFixture<GeneralComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [GeneralComponent],
        });
        fixture = TestBed.createComponent(GeneralComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
