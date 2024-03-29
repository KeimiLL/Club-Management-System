import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { PermissionDirective } from "../../../../../shared/directives/permission.directive";
import { Match, TableMatch } from "../../../../../shared/models/match.model";
import { ShortTeam } from "../../../../../shared/models/team.model";
import { CardsModule } from "../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../shared/modules/material.module";
import { DropdownViewManagerService } from "./../../../../../shared/services/dropdown-view-manager.service";
import { SplitViewManagerService } from "./../../../../../shared/services/split-view-manager.service";
import { TableService } from "./../../../../../shared/services/table.service";
import { ScheduleContentComponent } from "./components/schedule-content/schedule-content.component";
import { ScheduleTableComponent } from "./components/schedule-table/schedule-table.component";
import { ScheduleContentService } from "./services/schedule-content.service";
import { ScheduleRootService } from "./services/schedule-root.service";

@Component({
    selector: "app-schedule",
    standalone: true,
    imports: [
        CommonModule,
        CardsModule,
        MaterialModule,
        ScheduleContentComponent,
        ScheduleTableComponent,
        PermissionDirective,
    ],
    templateUrl: "./schedule.component.html",
    styleUrls: ["./schedule.component.scss"],
    providers: [
        DropdownViewManagerService,
        SplitViewManagerService,
        TableService,
        ScheduleRootService,
        ScheduleContentService,
    ],
})
export class ScheduleComponent {
    protected teams$: Observable<ShortTeam[]>;
    protected currentTeam$: Observable<ShortTeam>;
    protected tableMatches$: Observable<TableMatch[]>;
    protected currentMatch$: Observable<Match | null>;
    protected isDetail$: Observable<boolean>;

    constructor(
        private readonly splitView: SplitViewManagerService<Match>,
        private readonly dropdown: DropdownViewManagerService,
        private readonly root: ScheduleRootService,
        private readonly table: TableService<TableMatch>
    ) {
        this.teams$ = this.dropdown.teams$;
        this.currentTeam$ = this.dropdown.currentTeam$;
        this.isDetail$ = this.splitView.isDetail$;
        this.tableMatches$ = this.table.tableItems$;
        this.currentMatch$ = this.splitView.currentItem$;
    }

    protected switchDetail(): void {
        this.splitView.changeDetailState();
    }

    protected setSelectedTeam(team: ShortTeam): void {
        this.dropdown.changeTeam(team);
    }

    protected onNewMatchClick(): void {
        this.root.openNewMatchDialog();
    }

    protected onMatchDelete(): void {
        this.root.deleteCurrentMatch();
    }
}
