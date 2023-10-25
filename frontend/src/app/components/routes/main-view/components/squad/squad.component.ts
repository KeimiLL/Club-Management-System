import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { UserService } from "../../../../../shared/api/user.service";
import { ShortCoach } from "../../../../../shared/models/coach.model";
import { Player, TablePlayer } from "../../../../../shared/models/player.model";
import { ShortTeam } from "../../../../../shared/models/team.model";
import { CardsModule } from "../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../shared/modules/material.module";
import { GetItemByIdPipe } from "../../../../../shared/pipes/get-item-by-id.pipe";
import { DropdownViewManagerService } from "../../../../../shared/services/dropdown-view-manager.service";
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
        GetItemByIdPipe,
    ],
    templateUrl: "./squad.component.html",
    styleUrls: ["./squad.component.scss"],
    providers: [
        SquadRootService,
        TableService,
        SplitViewManagerService,
        DropdownViewManagerService,
    ],
})
export class SquadComponent {
    protected teams$: Observable<ShortTeam[]>;
    protected teamId$: Observable<number | null>;
    protected isDetail$: Observable<boolean>;
    protected tablePlayers$: Observable<TablePlayer>;
    protected currentPlayer$: Observable<Player>;
    protected currentCoach$: Observable<ShortCoach | null>;

    constructor(
        private readonly splitView: SplitViewManagerService<Player>,
        private readonly dropdown: DropdownViewManagerService,
        private readonly userService: UserService,
        private readonly root: SquadRootService,
        private readonly table: TableService<TablePlayer>
    ) {
        this.teams$ = this.dropdown.teams$;
        this.teamId$ = this.dropdown.teamId$;
        this.currentCoach$ = this.root.teamCoach$;
    }

    protected switchDetail(): void {
        this.splitView.changeDetailState();
    }

    protected setSelectedTeam(id: number): void {
        this.dropdown.changeTeamId(id);
    }
}
