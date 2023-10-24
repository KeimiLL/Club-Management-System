import { Pipe, PipeTransform } from "@angular/core";

import { allPermissions, SubPermissions } from "../models/permission.model";

@Pipe({
    name: "stringToSubpermission",
    standalone: true,
})
export class StringToSubpermissionPipe implements PipeTransform {
    transform(value: string): SubPermissions | null {
        if (
            Object.values(
                allPermissions.map((item) => item.valueOf())
            ).includes(value)
        ) {
            return value as SubPermissions;
        }
        return null;
    }
}
