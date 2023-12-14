import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Observable } from "rxjs";

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
    protected matches$: Observable<LiveMatch[]>;

    constructor(private readonly root: LiveMatchesRootService) {
        this.matches$ = this.root.liveMatches$;
    }
}
