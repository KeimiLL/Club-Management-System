import { WideMainCardComponent } from "./../components/wide-main-card/wide-main-card.component";
import { NgModule } from "@angular/core";
import { ButtonContainerComponent } from "../components/button-container/button-container.component";

@NgModule({
    imports: [WideMainCardComponent, ButtonContainerComponent],
    exports: [
        WideMainCardComponent,
        ButtonContainerComponent,
        //in future Half-card-component
    ],
})
export class CardsModule {}
