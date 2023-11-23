import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { ConfirmationPopupComponent } from "./confirmation-popup.component";

describe("ConfirmationPopupComponent", () => {
    let fixture: ComponentFixture<ConfirmationPopupComponent>;
    let component: ConfirmationPopupComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ConfirmationPopupComponent],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
            ],
        });

        fixture = TestBed.createComponent(ConfirmationPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
