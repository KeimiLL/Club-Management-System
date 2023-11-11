import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { HelpState } from "../help.data";
import { HelpRootService } from "../help-root.service";

@Component({
    selector: "app-help-card",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./help-card.component.html",
    styleUrls: ["./help-card.component.scss"],
})
export class HelpCardComponent {
    @Input() public cardHeadline: string;
    @Input() public cardText: string;
    @Input() public buttonText: string;

    constructor(private readonly helpService: HelpRootService) {}

    guide(): void {
        if (this.helpService.helpState === HelpState.Start) {
            this.helpService.startGuide();
        } else if (this.helpService.helpState === HelpState.Finish) {
            this.helpService.restartGuide();
        }
    }
}
