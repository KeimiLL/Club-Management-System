import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "filterUsingArray",
    standalone: true,
})
export class FilterUsingArrayPipe implements PipeTransform {
    transform<T>(inputArray: T[], filterArray: T[]): T[] {
        return inputArray.filter((element) => !filterArray.includes(element));
    }
}
