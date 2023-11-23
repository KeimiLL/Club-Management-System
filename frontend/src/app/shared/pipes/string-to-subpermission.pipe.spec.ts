import { MeetingsPermission } from "../models/permission.model";
import { StringToSubpermissionPipe } from "./string-to-subpermission.pipe";

describe("StringToSubpermissionPipe", () => {
    let pipe: StringToSubpermissionPipe;

    beforeEach(() => {
        pipe = new StringToSubpermissionPipe();
    });

    it("should be created", () => {
        expect(pipe).toBeTruthy();
    });

    it("should transform a valid string to SubPermission", () => {
        const result = pipe.transform("see_all");
        expect(result).toBe(MeetingsPermission.SeeAll);
    });
});
