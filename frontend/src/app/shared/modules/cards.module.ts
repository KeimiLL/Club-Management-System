import { WideMainCardComponent } from "./../components/wide-main-card/wide-main-card.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonContainerComponent } from "../components/button-container/button-container.component";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        WideMainCardComponent,
        ButtonContainerComponent,
        //in future Half-card-component
    ],
})
export class CardsModule {}
