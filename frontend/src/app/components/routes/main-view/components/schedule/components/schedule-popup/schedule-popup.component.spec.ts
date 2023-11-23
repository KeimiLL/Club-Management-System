import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SchedulePopupComponent } from "./schedule-popup.component";

describe("SchedulePopupComponent", () => {
    let fixture: ComponentFixture<SchedulePopupComponent>;
    let component: SchedulePopupComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                HttpClientTestingModule,
                MatDialogModule,
                SchedulePopupComponent,
            ],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
                { provide: MatDialogRef, useValue: {} },
            ],
        });

        fixture = TestBed.createComponent(SchedulePopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
