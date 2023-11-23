import { FilterUsingPropControlPipe } from "./filter-using-prop-control.pipe";

interface TestItem {
    id: number;
    name: string;
    category: string;
}

describe("FilterUsingPropControlPipe", () => {
    let pipe: FilterUsingPropControlPipe;
    const testArray: TestItem[] = [
        { id: 1, name: "Item 1", category: "Category A" },
        { id: 2, name: "Item 2", category: "Category B" },
        { id: 3, name: "Item 3", category: "Category A" },
        { id: 4, name: "Item 4", category: "Category B" },
        { id: 5, name: "Item 5", category: "Category C" },
    ];

    beforeEach(() => {
        pipe = new FilterUsingPropControlPipe();
    });

    it("should be created", () => {
        expect(pipe).toBeTruthy();
    });

    it("should filter elements based on the provided property and control value", () => {
        const property: keyof TestItem = "name";
        const controlValue = "item 2";
        const result = pipe.transform(testArray, property, controlValue);

        expect(result).toEqual([
            { id: 2, name: "Item 2", category: "Category B" },
        ]);
    });

    it("should handle a null control value", () => {
        const property: keyof TestItem = "category";
        const controlValue: string | null = null;
        const result = pipe.transform(testArray, property, controlValue);

        expect(result).toEqual(testArray);
    });

    it("should handle an empty array", () => {
        const property: keyof TestItem = "category";
        const controlValue = "category a";
        const result = pipe.transform([], property, controlValue);

        expect(result).toEqual([]);
    });
});
