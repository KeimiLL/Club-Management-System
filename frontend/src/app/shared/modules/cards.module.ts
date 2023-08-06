import { WideMainCardComponent } from "./../components/wide-main-card/wide-main-card.component";
import { NgModule } from "@angular/core";
import { ButtonContainerComponent } from "../components/button-container/button-container.component";
import { HalfCardComponent } from "../components/half-card/half-card.component";

@NgModule({
    imports: [
        WideMainCardComponent,
        ButtonContainerComponent,
        HalfCardComponent,
    ],
    exports: [
        WideMainCardComponent,
        ButtonContainerComponent,
        HalfCardComponent,
    ],
})
export class CardsModule {}
