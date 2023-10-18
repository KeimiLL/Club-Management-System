import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "snakeToNormal",
    standalone: true,
})
export class LowerSnakeToUpperNormal implements PipeTransform {
    transform(value: string, ...args: unknown[]): string {
        const newString = value[0].toUpperCase() + value.slice(1);
        return newString.replace("_", " ");
    }
}
