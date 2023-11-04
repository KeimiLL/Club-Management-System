import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";

@Component({
    selector: "app-help",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule],
    templateUrl: "./help.component.html",
    styleUrls: ["./help.component.scss"],
})
export class HelpComponent {}
