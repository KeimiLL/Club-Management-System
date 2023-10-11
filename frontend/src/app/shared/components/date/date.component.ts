import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-date",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./date.component.html",
    styleUrls: ["./date.component.scss"],
})
export class DateComponent {
    public date: Date = new Date(2010, 5, 15);
    public day = this.date.getDay();
    public month = this.date.getMonth();
    public year = this.date.getFullYear();
}
