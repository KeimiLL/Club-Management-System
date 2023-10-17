import { Pipe, PipeTransform } from "@angular/core";

import { Roles } from "../models/user.model";

@Pipe({
    name: "exludeRoleFromArray",
    standalone: true,
})
export class ExludeRoleFromArrayPipe implements PipeTransform {
    transform(roles: string[], roleToRemove: Roles): string[] {
        return roles.filter((role) => role !== roleToRemove);
    }
}
