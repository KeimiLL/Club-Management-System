import "./modify.component"
import "@angular/core/testing"
import TestBed }
import { ComponentFixture
import { ModifyComponent }

describe("ModifyComponent", () => {
    let component: ModifyComponent;
    let fixture: ComponentFixture<ModifyComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ModifyComponent],
        });
        fixture = TestBed.createComponent(ModifyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
