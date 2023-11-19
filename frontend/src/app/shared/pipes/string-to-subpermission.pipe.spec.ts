import { MeetingsPermission } from "../models/permission.model";
import { StringToSubpermissionPipe } from "./string-to-subpermission.pipe";

describe("StringToSubpermissionPipe", () => {
    let pipe: StringToSubpermissionPipe;

    beforeEach(() => {
        pipe = new StringToSubpermissionPipe();
    });

    it("should create an instance", () => {
        expect(pipe).toBeTruthy();
    });

    it("should transform a valid string to SubPermissions", () => {
        const result = pipe.transform("see_all");
        expect(result).toBe(MeetingsPermission.SeeAll);
    });
});
