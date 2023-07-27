import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainViewComponent } from "../main-view.component";
import { MenuModule } from "../components/menu/menu.module";

@NgModule({
    declarations: [MainViewComponent],
    exports: [MainViewComponent],
    imports: [CommonModule, MenuModule],
})
export class MainViewModule {}
