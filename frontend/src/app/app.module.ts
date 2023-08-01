import "./app-routing.module"
import "./app.component"
import "./components/base/footer/footer.component"
import "./components/routes/auth/auth.component"
import "./components/routes/auth/modules/auth.module"
import "@angular/common/http"
import "@angular/core"
import "@angular/platform-browser"
import "@angular/platform-browser/animations"
import { AppComponent }
import { AppRoutingModule }
import { AuthComponent }
import { AuthModule }
import { BrowserAnimationsModule }
import { BrowserModule }
import { FooterComponent }
import { HttpClientModule }
import { NgModule }

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
