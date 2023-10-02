import { SettingsComponent } from "./settings.component";

describe("SettingsComponent", () => {
    let component: SettingsComponent;

    beforeEach(() => {
        component = new SettingsComponent();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
