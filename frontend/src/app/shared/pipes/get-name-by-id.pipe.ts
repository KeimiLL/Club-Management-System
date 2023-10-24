import { Pipe, PipeTransform } from "@angular/core";

interface Dto {
    id: number;
    name: string;
}

@Pipe({
    name: "getNameById",
    standalone: true,
})
export class GetNameByIdPipe<T extends Dto> implements PipeTransform {
    transform(items: T[], id: number): string | undefined {
        const item = items.find((item) => item.id === id);
        return item?.name;
    }
}
