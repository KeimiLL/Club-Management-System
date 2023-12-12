import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import {
    MatchEvent,
    MatchEventType,
} from "../../../../models/match-event.model";

@Component({
    selector: "app-match-event",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./match-event.component.html",
    styleUrls: ["./match-event.component.scss"],
})
export class MatchEventComponent implements OnInit {
    MatchEventType = MatchEventType;
    @Input() public event: MatchEvent;

    constructor(
        private readonly matIconRegistry: MatIconRegistry,
        private readonly sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.matIconRegistry.addSvgIcon(
            "goal-icon",
            this.sanitizer.bypassSecurityTrustResourceUrl(
                "../../../../../../assets/icons/soccer_ball.svg"
            )
        );
    }
}
