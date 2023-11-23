import { LowerSnakeToUpperNormal } from "./lower-snake-to-upper-normal.pipe";

describe("LowerSnakeToUpperNormal", () => {
    let pipe: LowerSnakeToUpperNormal;

    beforeEach(() => {
        pipe = new LowerSnakeToUpperNormal();
    });

    it("should be created", () => {
        expect(pipe).toBeTruthy();
    });

    it("should transform snake_case to Normal Case", () => {
        const result = pipe.transform("hello_world");
        expect(result).toBe("Hello world");
    });

    it("should handle a string with no underscore", () => {
        const result = pipe.transform("helloWorld");
        expect(result).toBe("HelloWorld");
    });

    it("should handle a string with multiple underscores", () => {
        const result = pipe.transform("hello_world_example");
        expect(result).toBe("Hello world example");
    });

    it("should handle a string with leading underscore", () => {
        const result = pipe.transform("_hello_world");
        expect(result).toBe(" hello world");
    });

    it("should handle a string with trailing underscore", () => {
        const result = pipe.transform("hello_world_");
        expect(result).toBe("Hello world ");
    });
});
