import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { SpinnerComponent } from "../../../../../../../shared/components/spinner/spinner.component";
import { Player } from "../../../../../../../shared/models/player.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";

@Component({
    selector: "app-squad-content",
    standalone: true,
    imports: [CommonModule, CardsModule, SpinnerComponent],
    templateUrl: "./squad-content.component.html",
    styleUrls: ["./squad-content.component.scss"],
})
export class SquadContentComponent implements OnInit {
    @Input() public player: Player;
    protected isCurrentPlayerLoading$: Observable<boolean>;

    constructor(private readonly splitView: SplitViewManagerService<Player>) {}

    ngOnInit(): void {
        this.isCurrentPlayerLoading$ = this.splitView.isLoading$;
    }
}
