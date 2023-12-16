import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { LiveMatch, Match } from "../../models/match.model";
import { ScorePipe } from "../../pipes/score.pipe";
import { TooLongSentencePipe } from "../../pipes/too-long-sentence.pipe";

@Component({
    selector: "app-score[match]",
    standalone: true,
    imports: [CommonModule, ScorePipe, TooLongSentencePipe],
    templateUrl: "./score.component.html",
    styleUrls: ["./score.component.scss"],
})
export class ScoreComponent {
    @Input() public match: LiveMatch | Match;
    @Input() public maxChars?: number;
}
