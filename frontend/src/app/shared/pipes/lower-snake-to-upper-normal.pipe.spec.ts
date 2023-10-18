import { LowerSnakeToUpperNormal } from "./lower-snake-to-upper-normal.pipe";

xdescribe("LowerSnakeToUpperNormal", () => {
    it("create an instance", () => {
        const pipe = new LowerSnakeToUpperNormal();
        expect(pipe).toBeTruthy();
    });
});
