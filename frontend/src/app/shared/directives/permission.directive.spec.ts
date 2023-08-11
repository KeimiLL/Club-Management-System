import { TemplateRef, ViewContainerRef } from "@angular/core";

import { UserService } from "../services/user.service";
import { PermissionDirective } from "./permission.directive";

describe("PermissionDirective", () => {
    it("should create an instance", () => {
        const directive = new PermissionDirective(
            {} as TemplateRef<unknown>,
            {} as ViewContainerRef,
            {} as UserService
        );
        expect(directive).toBeTruthy();
    });
});
