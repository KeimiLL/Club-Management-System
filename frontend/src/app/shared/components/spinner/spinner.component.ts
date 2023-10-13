import { animate, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { MaterialModule } from "../../modules/material.module";
import { LoaderService } from "../../services/loader.service";

@Component({
    selector: "app-spinner",
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: "./spinner.component.html",
    styleUrls: ["./spinner.component.scss"],
    animations: [
        trigger("fade", [
            transition("void => *", [
                style({ opacity: 0 }),
                animate("250ms 100ms", style({ opacity: 1 })),
            ]),
            transition("* => void", [animate(250, style({ opacity: 0 }))]),
        ]),
    ],
})
export class SpinnerComponent {
    @Input() public spinnerMessage: string;
    constructor(private readonly loaderService: LoaderService) {}
}
