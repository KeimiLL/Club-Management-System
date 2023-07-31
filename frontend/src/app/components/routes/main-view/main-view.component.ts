import { Component } from "@angular/core";
import { MenuComponent } from "./components/menu/menu.component";
import { MainViewRoutingModule } from "./main-view-routing.module";

@Component({
    selector: "app-main-view",
    templateUrl: "./main-view.component.html",
    styleUrls: ["./main-view.component.scss"],
    standalone: true,
    imports: [MenuComponent, MainViewRoutingModule],
})
export class MainViewComponent {}
