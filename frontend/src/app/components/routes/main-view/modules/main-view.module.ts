import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainViewComponent } from "../main-view.component";

@NgModule({
    declarations: [MainViewComponent],
    exports: [MainViewComponent],
    imports: [CommonModule],
})
export class MainViewModule {}
