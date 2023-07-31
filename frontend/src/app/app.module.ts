import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MainViewComponent } from "./components/routes/main-view/main-view.component";
import { FooterComponent } from "./components/base/footer/footer.component";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FooterComponent,
        MainViewComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
