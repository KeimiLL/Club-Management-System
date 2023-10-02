import { MainViewComponent } from "./main-view.component";

describe("MainViewComponent", () => {
    let component: MainViewComponent;

    beforeEach(() => {
        component = new MainViewComponent();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
