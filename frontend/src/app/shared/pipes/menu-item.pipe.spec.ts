import { MenuItemPipe } from "./menu-item.pipe";

xdescribe("MenuItemPipe", () => {
    it("create an instance", () => {
        const pipe = new MenuItemPipe();
        expect(pipe).toBeTruthy();
    });
});
