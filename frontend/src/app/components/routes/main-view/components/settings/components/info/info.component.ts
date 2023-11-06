import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";

@Component({
    selector: "app-info",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule],
    templateUrl: "./info.component.html",
    styleUrls: ["./info.component.scss"],
})
export class InfoComponent {}
