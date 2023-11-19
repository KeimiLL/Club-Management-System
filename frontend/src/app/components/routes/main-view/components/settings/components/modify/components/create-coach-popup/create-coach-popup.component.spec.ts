import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CreateCoachPopupComponent } from "./create-coach-popup.component";

describe("CreateCoachPopupComponent", () => {
    let component: CreateCoachPopupComponent;
    let fixture: ComponentFixture<CreateCoachPopupComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CreateCoachPopupComponent, BrowserAnimationsModule],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
            ],
        });
        fixture = TestBed.createComponent(CreateCoachPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
