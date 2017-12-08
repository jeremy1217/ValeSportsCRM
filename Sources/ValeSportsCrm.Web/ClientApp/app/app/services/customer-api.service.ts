import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { ICustomer } from "../models/state.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class CustomerApiService extends ApiService<ICustomer> {
    constructor(protected http: HttpClient) {
        super(http, environment.apiUrl + "/customer");
    }
}
