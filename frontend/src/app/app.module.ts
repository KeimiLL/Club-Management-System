import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/base/footer/footer.component";
import { AuthComponent } from "./components/routes/auth/auth.component";
import { AuthModule } from "./components/routes/auth/modules/auth.module";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// import { MainViewComponent } from "./components/routes/main-view/main-view.component";
// import { FooterModule } from "./components/base/footer/footer.module";
// import { MainViewRoutingModule } from "./components/routes/main-view/main-view-routing.module";

@NgModule({
    declarations: [AppComponent, AuthComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FooterComponent,
        // MainViewComponent,
        // FooterModule,
        // MainViewRoutingModule,
        AuthModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
