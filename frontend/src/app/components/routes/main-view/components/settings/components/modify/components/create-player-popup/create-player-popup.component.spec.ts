import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CreatePlayerPopupComponent } from "./create-player-popup.component";

describe("CreatePlayerPopupComponent", () => {
    let component: CreatePlayerPopupComponent;
    let fixture: ComponentFixture<CreatePlayerPopupComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CreatePlayerPopupComponent,
                HttpClientTestingModule,
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
        fixture = TestBed.createComponent(CreatePlayerPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
