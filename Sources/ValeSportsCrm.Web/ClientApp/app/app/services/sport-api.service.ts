import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { ISport } from "../models/state.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { TdFileService, IUploadOptions } from "@covalent/core";

@Injectable()
export class SportApiService extends ApiService<ISport> {
    constructor(protected http: HttpClient, private _fileUploadService: TdFileService) {
        super(http, environment.apiUrl + "/sport");
    }
}
