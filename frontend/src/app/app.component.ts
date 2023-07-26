import { Component, OnInit } from "@angular/core";
import { TestService } from "./shared/services/test.service";
import { UserCreate } from "./shared/models/user.model";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    title = "CMS";

    constructor(private readonly testService: TestService) {}

    ngOnInit(): void {
        const user: UserCreate = {
            full_name: "testowy",
            email: "testowy@gmail.com",
            password: "abcABC1!",
        };

        this.testService.register(user).subscribe((data) => {
            console.log(data);
        });
    }
}
