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
    let component: TeamsPopupComponent;
    let fixture: ComponentFixture<TeamsPopupComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TeamsPopupComponent,
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
        fixture = TestBed.createComponent(TeamsPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
