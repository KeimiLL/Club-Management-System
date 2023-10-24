import { GetNameByIdPipe } from "./get-name-by-id.pipe";

describe("GetNameByIdPipe", () => {
    it("create an instance", () => {
        const pipe = new GetNameByIdPipe();
        expect(pipe).toBeTruthy();
    });
});
