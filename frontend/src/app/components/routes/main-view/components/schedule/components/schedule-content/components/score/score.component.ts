import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { take, tap } from "rxjs";

import { MatchScore } from "../../../../../../../../../shared/models/match.model";
import { MaterialModule } from "../../../../../../../../../shared/modules/material.module";
import { DropdownViewManagerService } from "../../../../../../../../../shared/services/dropdown-view-manager.service";

@Component({
    selector: "app-score[score]",
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: "./score.component.html",
    styleUrls: ["./score.component.scss"],
})
export class ScoreComponent implements OnInit {
    @Input() public score: MatchScore;

    protected homeName: string;
    protected awayName: string;
    protected homeGoals: number;
    protected awayGoals: number;

    constructor(private readonly dropdown: DropdownViewManagerService) {}

    ngOnInit(): void {
        this.score.is_home ? this.isHome() : this.isAway();
    }

    private isHome(): void {
        this.awayName = this.score.opponent;
        this.homeGoals = this.score.goals_scored;
        this.awayGoals = this.score.goals_conceded;
        this.dropdown.currentTeam$
            .pipe(
                take(1),
                tap((team) => (this.homeName = team.name))
            )
            .subscribe();
    }

    private isAway(): void {
        this.dropdown.currentTeam$
            .pipe(
                take(1),
                tap((team) => (this.awayName = team.name))
            )
            .subscribe();
        this.homeName = this.score.opponent;
        this.awayGoals = this.score.goals_scored;
        this.homeGoals = this.score.goals_conceded;
    }
}
