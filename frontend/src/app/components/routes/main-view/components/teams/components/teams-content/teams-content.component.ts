import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { Team } from "../../../../../../../shared/models/team.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";

@Component({
    selector: "app-teams-content",
    standalone: true,
    imports: [CommonModule, MaterialModule, CardsModule],
    templateUrl: "./teams-content.component.html",
    styleUrls: ["./teams-content.component.scss"],
})
export class TeamsContentComponent {
    @Input() public team: Team;
}
