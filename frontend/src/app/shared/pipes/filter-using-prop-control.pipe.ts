import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "filterUsingPropControl",
    standalone: true,
})
export class FilterUsingPropControlPipe implements PipeTransform {
    transform<T>(
        array: T[],
        property: keyof T,
        controlValue: string | null
    ): T[] {
        if (controlValue === null) return array;

        return array.filter((item) => {
            const value = (item[property] as string).toLowerCase();
            return value.includes(controlValue.toLocaleLowerCase());
        });
    }
}
