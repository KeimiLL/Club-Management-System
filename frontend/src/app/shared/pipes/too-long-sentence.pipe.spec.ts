import { TooLongSentencePipe } from "./too-long-sentence.pipe";

describe("TooLongSentencePipe", () => {
    it("create an instance", () => {
        const pipe = new TooLongSentencePipe();
        expect(pipe).toBeTruthy();
    });
});
