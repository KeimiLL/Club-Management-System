import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { tap } from "rxjs";

import { MatchScore } from "../../../../../../../../../shared/models/match.model";
import { MaterialModule } from "../../../../../../../../../shared/modules/material.module";
import { ScorePipe } from "../../../../../../../../../shared/pipes/score.pipe";
import { DropdownViewManagerService } from "../../../../../../../../../shared/services/dropdown-view-manager.service";

@Component({
    selector: "app-score",
    standalone: true,
    imports: [CommonModule, MaterialModule, ScorePipe],
    templateUrl: "./score.component.html",
    styleUrls: ["./score.component.scss"],
})
export class ScoreComponent {
    @Input() public set score(score: MatchScore) {
        this.matchScore = score;
        score.is_home ? this.isHome() : this.isAway();
    }

    protected matchScore: MatchScore;
    protected homeName: string;
    protected awayName: string;

    constructor(private readonly dropdown: DropdownViewManagerService) {}

    private isHome(): void {
        this.awayName = this.matchScore.opponent;
        this.dropdown.currentTeam$
            .pipe(tap((team) => (this.homeName = team.name)))
            .subscribe();
    }

    private isAway(): void {
        this.dropdown.currentTeam$
            .pipe(tap((team) => (this.awayName = team.name)))
            .subscribe();
        this.homeName = this.matchScore.opponent;
    }
}
