import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { BackendResponse } from "../models/misc.model";
import { UserCreate } from "../models/user.model";
import { mockUser } from "./../test-mocks/test-mocks";
import { UserService } from "./user.service";

describe("UserService", () => {
    let userService: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService],
        });
        userService = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(userService).toBeTruthy();
    });

    it("should register a user", () => {
        const userCreate: UserCreate = {
            ...mockUser,
            password: "12345678",
        };

        const mockResponse: BackendResponse = {
            message: "User registered successfully",
        };

        userService.register(userCreate).subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne("api/v1/users/register");
        expect(req.request.method).toBe("POST");
        expect(req.request.body).toEqual(userCreate);

        req.flush(mockResponse);
    });
});
