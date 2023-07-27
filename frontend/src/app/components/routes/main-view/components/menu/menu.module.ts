import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuComponent } from "./menu.component";
import { MaterialModule } from "src/app/material.module";
import { MenuItemComponent } from "./components/menu-item/menu-item.component";
import { MenuHeaderComponent } from "./components/menu-header/menu-header.component";

@NgModule({
    declarations: [MenuComponent, MenuItemComponent, MenuHeaderComponent],
    exports: [MenuComponent],
    imports: [CommonModule, MaterialModule],
})
export class MenuModule {}
