import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "tooLongSentence",
    standalone: true,
})
export class TooLongSentencePipe implements PipeTransform {
    transform(value: string, maxChars: number | undefined): string {
        if (maxChars === undefined) return value;
        return `${value.substring(0, maxChars)}..`;
    }
}
