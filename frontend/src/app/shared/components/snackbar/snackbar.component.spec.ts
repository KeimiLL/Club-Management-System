import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
    MAT_SNACK_BAR_DATA,
    MatSnackBarModule,
} from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SnackbarComponent } from "./snackbar.component";

describe("SnackbarComponent", () => {
    let fixture: ComponentFixture<SnackbarComponent>;
    let component: SnackbarComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, MatSnackBarModule, BrowserAnimationsModule],
            providers: [
                {
                    provide: MAT_SNACK_BAR_DATA,
                    useValue: { message: "Test Message", variant: "normal" },
                },
            ],
        });

        fixture = TestBed.createComponent(SnackbarComponent);
        component = fixture.componentInstance;
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should display the message in the template", () => {
        fixture.detectChanges();
        const element: HTMLElement = fixture.nativeElement;
        expect(element.textContent).toContain("Test Message");
    });
});
