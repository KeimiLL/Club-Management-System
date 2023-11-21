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
    let component: SchedulePopupComponent;
    let fixture: ComponentFixture<SchedulePopupComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SchedulePopupComponent,
                HttpClientTestingModule,
                MatDialogModule,
                BrowserAnimationsModule,
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
            ],
        });
        fixture = TestBed.createComponent(SchedulePopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
