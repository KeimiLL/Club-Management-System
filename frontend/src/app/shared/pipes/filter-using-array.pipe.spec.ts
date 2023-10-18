import { FilterUsingArrayPipe } from "./filter-using-array.pipe";

describe("FilterUsingArrayPipe", () => {
    it("create an instance", () => {
        const pipe = new FilterUsingArrayPipe();
        expect(pipe).toBeTruthy();
    });
});
