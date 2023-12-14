import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { LiveMatch } from "../../../../../../../shared/models/match.model";
import { LiveMatchComponent } from "./components/live-match/live-match.component";
import { LiveMatchesRootService } from "./services/live-matches-root.service";

@Component({
    selector: "app-live-matches",
    standalone: true,
    imports: [CommonModule, LiveMatchComponent],
    templateUrl: "./live-matches.component.html",
    styleUrls: ["./live-matches.component.scss"],
    providers: [LiveMatchesRootService],
})
export class LiveMatchesComponent {
    constructor(private readonly root: LiveMatchesRootService) {
        this.root.liveMatches$.subscribe((matches: LiveMatch[]) => {
            console.log(matches);
        });
    }
}
