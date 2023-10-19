import { Pipe, PipeTransform } from "@angular/core";

import { SubPermissions } from "../models/permission.model";
import { SubPermissionsStrings } from "./../models/permission.model";

@Pipe({
    name: "stringToSubpermission",
    standalone: true,
})
export class StringToSubpermissionPipe implements PipeTransform {
    transform(
        value: SubPermissionsStrings,
        ...args: unknown[]
    ): SubPermissions {
        return value as SubPermissions;
    }
}
