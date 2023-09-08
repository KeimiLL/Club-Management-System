import { NgModule } from "@angular/core";

import { ButtonContainerComponent } from "../components/button-container/button-container.component";
import { HalfCardLeftHeaderComponent } from "../components/cards/components/half-card-left-header/half-card-left-header.component";
import { HalfCardRightHeaderComponent } from "../components/cards/components/half-card-right-header/half-card-right-header.component";
import { SectionHeaderComponent } from "../components/cards/components/section-header/section-header.component";
import { WideCardHeaderComponent } from "../components/cards/components/wide-card-header/wide-card-header.component";
import { ContentCardComponent } from "../components/cards/content-card/content-card.component";
import { HalfCardSectionComponent } from "../components/cards/half-card-section/half-card-section.component";

@NgModule({
    imports: [
        ContentCardComponent,
        ButtonContainerComponent,
        HalfCardLeftHeaderComponent,
        HalfCardRightHeaderComponent,
        HalfCardSectionComponent,
        WideCardHeaderComponent,
        SectionHeaderComponent,
    ],
    exports: [
        ContentCardComponent,
        ButtonContainerComponent,
        HalfCardLeftHeaderComponent,
        HalfCardRightHeaderComponent,
        HalfCardSectionComponent,
        WideCardHeaderComponent,
        SectionHeaderComponent,
    ],
})
export class CardsModule {}
