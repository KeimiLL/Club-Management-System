import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuComponent } from "./menu.component";
import { MaterialModule } from "src/app/material.module";

@NgModule({
    declarations: [MenuComponent],
    exports: [MenuComponent],
    imports: [CommonModule, MaterialModule],
})
export class MenuModule {}
