import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { HttpClientModule } from "@angular/common/http";
import { FooterModule } from "./components/base/footer/footer.module";
import { MainViewModule } from "./components/routes/main-view/modules/main-view.module";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FooterModule,
        MainViewModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
