import { Pipe, PipeTransform } from "@angular/core";

import { MatchScore } from "../models/match.model";

@Pipe({
    name: "score",
    standalone: true,
})
export class ScorePipe implements PipeTransform {
    transform<T extends MatchScore>(match: T): string {
        if (match.goals_conceded === null || match.goals_scored === null) {
            return "0 : 0";
        }
        return match.is_home
            ? `${match.goals_scored} : ${match.goals_conceded}`
            : `${match.goals_conceded} : ${match.goals_scored}`;
    }
}
