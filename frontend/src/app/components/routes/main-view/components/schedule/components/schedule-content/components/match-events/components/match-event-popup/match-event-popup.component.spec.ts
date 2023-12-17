import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatchEventPopupComponent } from "./match-event-popup.component";

describe("MatchEventPopupComponent", () => {
    let component: MatchEventPopupComponent;
    let fixture: ComponentFixture<MatchEventPopupComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatchEventPopupComponent,
                MatDialogModule,
                BrowserAnimationsModule,
            ],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
            ],
        });
        fixture = TestBed.createComponent(MatchEventPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
