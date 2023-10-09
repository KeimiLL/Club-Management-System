import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { TableService } from "../../../../../../../shared/services/table.service";

@Component({
    selector: "app-modify",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule],
    templateUrl: "./modify.component.html",
    styleUrls: ["./modify.component.scss"],
    providers: [TableService],
})
export class ModifyComponent {}
