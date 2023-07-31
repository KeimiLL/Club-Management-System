import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MainViewComponent } from "./components/routes/main-view/main-view.component";
import { FooterComponent } from "./components/base/footer/footer.component";
// import { FooterModule } from "./components/base/footer/footer.module";
// import { MainViewModule } from "./components/routes/main-view/modules/main-view.module";
import { AuthComponent } from "./components/routes/auth/auth.component";
import { AuthModule } from "./components/routes/auth/modules/auth.module";

@NgModule({
    declarations: [AppComponent, AuthComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FooterComponent,
        MainViewComponent,
        // FooterModule,
        // MainViewModule,
        AuthModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
