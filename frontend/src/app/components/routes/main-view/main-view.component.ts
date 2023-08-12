import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MenuComponent } from "./components/menu/menu.component";

@Component({
    selector: "app-main-view",
    templateUrl: "./main-view.component.html",
    styleUrls: ["./main-view.component.scss"],
    standalone: true,
    imports: [MenuComponent, RouterModule],
})
export class MainViewComponent {}
