import { FilterUsingArrayPipe } from "./filter-using-array.pipe";

describe("FilterUsingArrayPipe", () => {
    let pipe: FilterUsingArrayPipe;

    beforeEach(() => {
        pipe = new FilterUsingArrayPipe();
    });

    it("should be created", () => {
        expect(pipe).toBeTruthy();
    });

    it("should filter elements based on the provided filter array", () => {
        const inputArray = [1, 2, 3, 4, 5];
        const filterArray = [2, 4];
        const result = pipe.transform(inputArray, filterArray);

        expect(result).toEqual([1, 3, 5]);
    });

    it("should handle an empty input array", () => {
        const inputArray: number[] = [];
        const filterArray = [2, 4];
        const result = pipe.transform(inputArray, filterArray);

        expect(result).toEqual([]);
    });

    it("should handle an empty filter array", () => {
        const inputArray = [1, 2, 3, 4, 5];
        const filterArray: number[] = [];
        const result = pipe.transform(inputArray, filterArray);

        expect(result).toEqual(inputArray);
    });

    it("should handle both empty input and filter arrays", () => {
        const inputArray: number[] = [];
        const filterArray: number[] = [];
        const result = pipe.transform(inputArray, filterArray);

        expect(result).toEqual([]);
    });
});
