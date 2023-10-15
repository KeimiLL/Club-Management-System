import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { TableTeam, Team } from "../../../../../shared/models/team.model";
import { CardsModule } from "../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../shared/services/table.service";
import { TeamsContentComponent } from "./components/teams-content/teams-content.component";
import { TeamsTableComponent } from "./components/teams-table/teams-table.component";
import { TeamsRootService } from "./services/teams-root.service";

@Component({
    selector: "app-teams",
    standalone: true,
    imports: [
        CommonModule,
        CardsModule,
        MaterialModule,
        TeamsContentComponent,
        TeamsTableComponent,
    ],
    templateUrl: "./teams.component.html",
    styleUrls: ["./teams.component.scss"],
    providers: [TeamsRootService, SplitViewManagerService, TableService],
})
export class TeamsComponent implements OnInit {
    protected isDetail$: Observable<boolean>;
    protected tableTeams$: Observable<TableTeam[]>;
    protected currentTeam$: Observable<Team | null>;

    constructor(
        private readonly splitView: SplitViewManagerService<Team>,
        private readonly root: TeamsRootService,
        private readonly table: TableService<TableTeam>
    ) {}

    ngOnInit(): void {
        this.isDetail$ = this.splitView.isDetail$;
        this.tableTeams$ = this.table.tableItems$;
        this.currentTeam$ = this.splitView.currentItem$;
    }

    protected switchDetail(): void {
        this.splitView.changeDetailState();
    }
}
