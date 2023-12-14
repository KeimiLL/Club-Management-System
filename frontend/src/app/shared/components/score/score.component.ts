import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { LiveMatch, Match } from "../../models/match.model";
import { ScorePipe } from "../../pipes/score.pipe";

@Component({
    selector: "app-score",
    standalone: true,
    imports: [CommonModule, ScorePipe],
    templateUrl: "./score.component.html",
    styleUrls: ["./score.component.scss"],
})
export class ScoreComponent {
    @Input() public match: LiveMatch | Match;
}
