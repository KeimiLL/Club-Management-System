import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { CardsModule } from "../../../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../../../shared/modules/material.module";

@Component({
    selector: "app-match-squad",
    standalone: true,
    imports: [CommonModule, MaterialModule, CardsModule],
    templateUrl: "./match-squad.component.html",
    styleUrls: ["./match-squad.component.scss"],
})
export class MatchSquadComponent {
    @Input() public squad: string[];
}
