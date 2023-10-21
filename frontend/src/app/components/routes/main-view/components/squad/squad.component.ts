import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { Player, TablePlayer } from "../../../../../shared/models/player.model";
import { CardsModule } from "../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../shared/services/table.service";
import { SquadContentComponent } from "./components/squad-content/squad-content.component";
import { SquadTableComponent } from "./components/squad-table/squad-table.component";
import { SquadRootService } from "./services/squad-root.service";

@Component({
    selector: "app-squad",
    standalone: true,
    imports: [
        CommonModule,
        CardsModule,
        MaterialModule,
        SquadTableComponent,
        SquadContentComponent,
    ],
    templateUrl: "./squad.component.html",
    styleUrls: ["./squad.component.scss"],
    providers: [SquadRootService, TableService, SplitViewManagerService],
})
export class SquadComponent {
    protected isDetail$: Observable<boolean>;
    protected tablePlayers$: Observable<TablePlayer>;
    protected currentPlayer$: Observable<Player>;

    constructor(
        private readonly splitView: SplitViewManagerService<Player>,
        private readonly root: SquadRootService,
        private readonly table: TableService<TablePlayer>
    ) {}

    protected switchDetail(): void {
        this.splitView.changeDetailState();
    }
}
