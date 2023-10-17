import { TemplateRef, ViewContainerRef } from "@angular/core";

import { UserService } from "../api/user.service";
import { PermissionDirective } from "./permission.directive";

xdescribe("PermissionDirective", () => {
    it("should create an instance", () => {
        const directive = new PermissionDirective(
            {} as TemplateRef<unknown>,
            {} as ViewContainerRef,
            {} as UserService
        );
        expect(directive).toBeTruthy();
    });
});
