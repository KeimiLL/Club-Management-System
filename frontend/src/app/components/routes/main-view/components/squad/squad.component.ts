import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { UserService } from "../../../../../shared/api/user.service";
import { CoachName } from "../../../../../shared/models/coach.model";
import { Player, TablePlayer } from "../../../../../shared/models/player.model";
import { ShortTeam } from "../../../../../shared/models/team.model";
import { Roles } from "../../../../../shared/models/user.model";
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
export class SquadComponent implements OnInit {
    protected teams$: Observable<ShortTeam[]>;
    protected currentTeam$: Observable<ShortTeam | null>;
    protected isDetail$: Observable<boolean>;
    protected tablePlayers$: Observable<TablePlayer[]>;
    protected currentPlayer$: Observable<Player | null>;
    protected currentCoach$: Observable<CoachName | null>;

    protected currentPlayerAsUserId: number | null = null;

    constructor(
        private readonly splitView: SplitViewManagerService<Player>,
        private readonly dropdown: DropdownViewManagerService,
        private readonly userService: UserService,
        private readonly root: SquadRootService,
        private readonly table: TableService<TablePlayer>
    ) {
        this.teams$ = this.dropdown.teams$;
        this.currentTeam$ = this.dropdown.currentTeam$;
        this.currentCoach$ = this.root.teamCoach$;
        this.isDetail$ = this.splitView.isDetail$;
        this.tablePlayers$ = this.table.tableItems$;
        this.currentPlayer$ = this.splitView.currentItem$;
    }

    ngOnInit(): void {
        const { currentUser } = this.userService;
        if (currentUser === null) return;
        if (currentUser.role === Roles.Player) {
            this.currentPlayerAsUserId = currentUser.id;
        }
    }

    protected switchDetail(): void {
        this.splitView.changeDetailState();
    }

    protected setSelectedTeam(team: ShortTeam): void {
        this.dropdown.changeTeam(team);
    }

    protected openCurrentPlayerInfo(): void {
        if (this.currentPlayerAsUserId === null) return;
        this.splitView.addParamsToRouting(this.currentPlayerAsUserId);
    }
}
