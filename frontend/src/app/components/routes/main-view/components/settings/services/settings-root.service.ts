import { Injectable } from "@angular/core";

import { UserService } from "../../../../../../shared/services/user.service";

@Injectable()
export class SettingsRootService {
    constructor(private readonly userService: UserService) {}
}
