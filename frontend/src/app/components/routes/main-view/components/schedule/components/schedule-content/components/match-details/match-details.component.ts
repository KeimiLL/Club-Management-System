import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { MatchDetails } from "../../../../../../../../../shared/models/match.model";
import { CardsModule } from "../../../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../../../shared/modules/material.module";

@Component({
    selector: "app-match-details",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule],
    templateUrl: "./match-details.component.html",
    styleUrls: ["./match-details.component.scss"],
})
export class MatchDetailsComponent {
    @Input() public matchDetails: MatchDetails;
}
