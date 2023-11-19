import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DropdownViewManagerService } from "../../../services/dropdown-view-manager.service";
import { ContentCardComponent } from "./content-card.component";

describe("ContentCardComponent", () => {
    let component: ContentCardComponent;
    let fixture: ComponentFixture<ContentCardComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ContentCardComponent],
            providers: [DropdownViewManagerService],
        });
        fixture = TestBed.createComponent(ContentCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
