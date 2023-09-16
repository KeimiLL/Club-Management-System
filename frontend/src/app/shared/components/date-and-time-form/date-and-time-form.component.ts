import { CommonModule } from "@angular/common";
import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { MaterialModule } from "../../modules/material.module";

@Component({
    selector: "app-date-and-time-form",
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: "./date-and-time-form.component.html",
    styleUrls: ["./date-and-time-form.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateAndTimeFormComponent),
            multi: true,
        },
    ],
})
export class DateAndTimeFormComponent implements ControlValueAccessor {
    protected selectedDate: Date = new Date();

    private onChange: (value: Date) => void;
    private onTouched: () => void;

    writeValue(value: Date): void {
        this.selectedDate = value;
    }

    registerOnChange(fn: (value: Date) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    selectDateTime(): void {
        this.onChange(this.selectedDate);
        this.onTouched();
    }
}
