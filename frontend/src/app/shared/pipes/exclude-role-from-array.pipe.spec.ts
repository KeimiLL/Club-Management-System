import { Roles } from "../models/user.model";
import { ExcludeRoleFromArrayPipe } from "./exclude-role-from-array.pipe";

describe("ExcludeRoleFromArrayPipe", () => {
    let pipe: ExcludeRoleFromArrayPipe;

    beforeEach(() => {
        pipe = new ExcludeRoleFromArrayPipe();
    });

    it("should be created", () => {
        expect(pipe).toBeTruthy();
    });

    it("should exclude the specified role from the array", () => {
        const roles = ["admin", "player", "viewer"];
        const roleToRemove: Roles = Roles.Admin;
        const result = pipe.transform(roles, roleToRemove);

        expect(result).toEqual(["player", "viewer"]);
    });

    it("should handle an empty array", () => {
        const roles: string[] = [];
        const roleToRemove: Roles = Roles.Player;
        const result = pipe.transform(roles, roleToRemove);

        expect(result).toEqual(roles);
    });

    it("should handle removing a role that does not exist in the array", () => {
        const roles = ["admin", "player", "viewer"];
        const roleToRemove: Roles = Roles.Coach;
        const result = pipe.transform(roles, roleToRemove);

        expect(result).toEqual(roles);
    });
});
