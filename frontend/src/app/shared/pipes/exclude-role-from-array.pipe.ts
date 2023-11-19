import { Pipe, PipeTransform } from "@angular/core";

import { Roles } from "../models/user.model";

@Pipe({
    name: "excludeRoleFromArray",
    standalone: true,
})
export class ExcludeRoleFromArrayPipe implements PipeTransform {
    transform(roles: string[], roleToRemove: Roles): string[] {
        return roles.filter((role) => role !== roleToRemove);
    }
}
