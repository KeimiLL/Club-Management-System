import { ExludeRoleFromArrayPipe } from "./exlude-role-from-array.pipe";

describe("ExludeRoleFromArrayPipe", () => {
    it("create an instance", () => {
        const pipe = new ExludeRoleFromArrayPipe();
        expect(pipe).toBeTruthy();
    });
});
