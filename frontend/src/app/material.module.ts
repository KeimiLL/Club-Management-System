import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";

@NgModule({
    exports: [MatButtonModule, MatToolbarModule, MatSidenavModule],
})
export class MaterialModule {}
