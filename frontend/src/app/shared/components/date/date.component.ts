import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-date",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./date.component.html",
    styleUrls: ["./date.component.scss"],
})
export class DateComponent implements OnChanges {
    @Input() date: string;
    cssClass: string;

    ngOnChanges(): void {
        const dateObject = new Date(this.date);
        const today = new Date();

        if (this.areDatesEqual(dateObject, today)) {
            this.cssClass = "date--today";
        } else if (dateObject < today) {
            this.cssClass = "date--past";
        } else {
            this.cssClass = "date--future";
        }
    }

    private areDatesEqual(date1: Date, date2: Date): boolean {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    }
}
