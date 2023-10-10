import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { UserForAdmin } from "../../../../../../../shared/models/user.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { TableService } from "../../../../../../../shared/services/table.service";
import { UserTableComponent } from "./components/user-table/user-table.component";
import { SettingsModifyRootService } from "./settings-modify-root.service";

@Component({
    selector: "app-modify",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule, UserTableComponent],
    templateUrl: "./modify.component.html",
    styleUrls: ["./modify.component.scss"],
    providers: [TableService, SettingsModifyRootService],
})
export class ModifyComponent implements OnInit {
    protected users$: Observable<UserForAdmin[]>;

    constructor(private readonly root: SettingsModifyRootService) {}

    ngOnInit(): void {
        this.users$ = this.root.users$;
    }
}
