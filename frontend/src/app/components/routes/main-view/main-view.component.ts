import { Component } from "@angular/core";
import { MenuComponent } from "./components/menu/menu.component";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-main-view",
    templateUrl: "./main-view.component.html",
    styleUrls: ["./main-view.component.scss"],
    standalone: true,
    imports: [MenuComponent, RouterModule],
})
export class MainViewComponent {}
