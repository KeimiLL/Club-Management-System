import { GetItemByIdPipe } from "./get-item-by-id.pipe";

describe("GetItemByIdPipe", () => {
    it("create an instance", () => {
        const pipe = new GetItemByIdPipe();
        expect(pipe).toBeTruthy();
    });
});
