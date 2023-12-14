import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { LiveMatch } from "../../../../../../../../../shared/models/match.model";

@Component({
    selector: "app-live-match",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./live-match.component.html",
    styleUrls: ["./live-match.component.scss"],
})
export class LiveMatchComponent {
    @Input() public match: LiveMatch;
}
