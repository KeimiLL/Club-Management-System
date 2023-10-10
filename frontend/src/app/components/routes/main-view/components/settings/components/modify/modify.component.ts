import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { ShortUser } from "../../../../../../../shared/models/user.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { SettingsRootService } from "../../services/settings-root.service";
import { UserTableComponent } from "./components/user-table/user-table.component";

@Component({
    selector: "app-modify",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule, UserTableComponent],
    templateUrl: "./modify.component.html",
    styleUrls: ["./modify.component.scss"],
})
export class ModifyComponent implements OnInit {
    protected users$: Observable<ShortUser[]>;

    constructor(private readonly root: SettingsRootService) {}

    ngOnInit(): void {
        this.users$ = this.root.users$;
    }
}
