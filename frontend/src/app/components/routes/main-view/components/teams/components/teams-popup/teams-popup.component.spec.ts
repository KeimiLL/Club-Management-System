import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { TeamsPopupComponent } from "./teams-popup.component";

describe("TeamsPopupComponent", () => {
    let fixture: ComponentFixture<TeamsPopupComponent>;
    let component: TeamsPopupComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,

                HttpClientTestingModule,
                MatDialogModule,
                TeamsPopupComponent,
            ],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
                { provide: MatDialogRef, useValue: {} },
            ],
        });

        fixture = TestBed.createComponent(TeamsPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
