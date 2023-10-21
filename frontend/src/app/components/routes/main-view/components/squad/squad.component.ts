import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { SquadRootService } from "./services/squad-root.service";

@Component({
    selector: "app-squad",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./squad.component.html",
    styleUrls: ["./squad.component.scss"],
    providers: [SquadRootService],
})
export class SquadComponent {}
