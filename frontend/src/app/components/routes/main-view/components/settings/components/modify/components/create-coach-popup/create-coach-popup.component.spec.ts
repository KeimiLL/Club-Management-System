import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CreateCoachPopupComponent } from "./create-coach-popup.component";

describe("CreateCoachPopupComponent", () => {
    let fixture: ComponentFixture<CreateCoachPopupComponent>;
    let component: CreateCoachPopupComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, CreateCoachPopupComponent],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
                { provide: MatDialogRef, useValue: {} },
            ],
        });

        fixture = TestBed.createComponent(CreateCoachPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
