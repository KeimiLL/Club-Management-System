import { Pipe, PipeTransform } from "@angular/core";

interface Dto {
    id: number;
    name: string;
}

@Pipe({
    name: "getItemById",
    standalone: true,
})
export class GetItemByIdPipe<T extends Dto> implements PipeTransform {
    transform(items: T[], id: number): T | undefined {
        const item = items.find((item) => item.id === id);
        return item;
    }
}
