import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { MatchContentType } from "../../../../../../shared/models/match.model";

@Injectable()
export class ScheduleContentService {
    private readonly contentTypeStore$ = new BehaviorSubject<MatchContentType>(
        MatchContentType.Basic
    );

    public get contentType$(): Observable<MatchContentType> {
        return this.contentTypeStore$.asObservable();
    }

    private set contentType(contentType: MatchContentType) {
        this.contentTypeStore$.next(contentType);
    }

    public toggleContentType(contentType: MatchContentType): void {
        this.contentType = contentType;
    }
}
