import { Pipe, PipeTransform } from "@angular/core";

import { TableMatch } from "../models/match.model";

@Pipe({
    name: "score",
    standalone: true,
})
export class ScorePipe implements PipeTransform {
    transform(match: TableMatch): string {
        if (match.goals_conceded === null || match.goals_scored === null) {
            return "No Score";
        }
        return match.is_home
            ? `${match.goals_scored} : ${match.goals_conceded}`
            : `${match.goals_conceded} + " : " ${match.goals_scored}`;
    }
}
