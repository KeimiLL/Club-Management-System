import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CreatePlayerPopupComponent } from "./create-player-popup.component";

describe("CreatePlayerPopupComponent", () => {
    let fixture: ComponentFixture<CreatePlayerPopupComponent>;
    let component: CreatePlayerPopupComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                CreatePlayerPopupComponent,
                HttpClientTestingModule,
            ],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
                { provide: MatDialogRef, useValue: {} },
            ],
        });

        fixture = TestBed.createComponent(CreatePlayerPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
