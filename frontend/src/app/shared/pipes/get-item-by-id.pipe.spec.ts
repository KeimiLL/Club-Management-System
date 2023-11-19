import { GetItemByIdPipe } from "./get-item-by-id.pipe";

interface TestDto {
    id: number;
    name: string;
}

describe("GetItemByIdPipe", () => {
    let pipe: GetItemByIdPipe<TestDto>;
    const testArray: TestDto[] = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
    ];

    beforeEach(() => {
        pipe = new GetItemByIdPipe();
    });

    it("should create an instance", () => {
        expect(pipe).toBeTruthy();
    });

    it("should return the item with the specified id", () => {
        const idToFind = 2;
        const result = pipe.transform(testArray, idToFind);

        expect(result).toEqual({ id: 2, name: "Item 2" });
    });

    it("should return undefined for a non-existent id", () => {
        const idToFind = 4;
        const result = pipe.transform(testArray, idToFind);

        expect(result).toBeUndefined();
    });

    it("should handle an empty array", () => {
        const idToFind = 1;
        const result = pipe.transform([], idToFind);

        expect(result).toBeUndefined();
    });
});
