import { NgModule } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
    ],
})
export class MaterialModule {}
