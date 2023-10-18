import { Pipe, PipeTransform } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Pipe({
    name: "filterUsingPropControl",
    standalone: true,
})
export class FilterUsingPropControlPipe implements PipeTransform {
    transform<T>(array: T[], property: keyof T, control: AbstractControl): T[] {
        if (control.value === null) return array;

        return array.filter((item) => {
            const value = (item[property] as string).toLowerCase();
            return value.includes(control.value.toLocaleLowerCase());
        });
    }
}
