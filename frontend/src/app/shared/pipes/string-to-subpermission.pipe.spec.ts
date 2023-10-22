import { StringToSubpermissionPipe } from "./string-to-subpermission.pipe";

describe("StringToSubpermissionPipe", () => {
    it("create an instance", () => {
        const pipe = new StringToSubpermissionPipe();
        expect(pipe).toBeTruthy();
    });
});
