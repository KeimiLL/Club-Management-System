import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-date",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./date.component.html",
    styleUrls: ["./date.component.scss"],
})
export class DateComponent implements OnInit {
    @Input() public date: string;
    protected cssClass: string;

    ngOnInit(): void {
        const dateObject = new Date(this.date);
        const today = new Date();
        this.cssClass = this.getClassForDate(dateObject, today);
    }

    private getClassForDate(inputDate: Date, currentDate: Date): string {
        if (this.areDatesEqual(inputDate, currentDate)) {
            return "date--today";
        } else if (inputDate < currentDate) {
            return "date--past";
        }
        return "date--future";
    }

    private areDatesEqual(date1: Date, date2: Date): boolean {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    }
}
