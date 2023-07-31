import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
    ],
})
export class MaterialModule {}
