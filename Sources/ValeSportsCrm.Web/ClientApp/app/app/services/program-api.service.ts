import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { IProgram } from "../models/state.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class ProgramApiService extends ApiService<IProgram> {
    constructor(protected http: HttpClient) {
        super(http, environment.apiUrl + "/program");
    }
}
