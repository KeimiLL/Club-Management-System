import { UserService } from "../../../../../../../shared/api/user.service";
import { SettingsMenuComponent } from "./settings-menu.component";

describe("SettingsMenuComponent", () => {
    let component: SettingsMenuComponent;
    let userService: jasmine.SpyObj<UserService>;

    beforeEach(() => {
        userService = jasmine.createSpyObj("UserService", ["get currentUser"]);

        component = new SettingsMenuComponent(userService);
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });
});
