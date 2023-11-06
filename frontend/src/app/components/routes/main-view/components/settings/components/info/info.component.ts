import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { Faq, faq } from "./info.data";

@Component({
    selector: "app-info",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule],
    templateUrl: "./info.component.html",
    styleUrls: ["./info.component.scss"],
})
export class InfoComponent implements OnInit {
    protected faq: Faq[] = faq;
    protected selectedFaq: Faq | null = null;

    ngOnInit(): void {
        [this.selectedFaq] = faq;
    }

    selectFaq(singleFaq: Faq): void {
        this.selectedFaq = singleFaq;
    }
}
