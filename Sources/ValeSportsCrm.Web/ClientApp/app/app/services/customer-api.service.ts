import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { ICustomer } from "../models/state.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { TdFileService, IUploadOptions } from "@covalent/core";

@Injectable()
export class CustomerApiService extends ApiService<ICustomer> {
    constructor(protected http: HttpClient, private _fileUploadService: TdFileService) {
        super(http, environment.apiUrl + "/customer");
    }

    upload(file: File) {
        const options: IUploadOptions = {
            url: environment.apiUrl + "/customer/upload",
            method: 'post',
            file: file
        };
        return this._fileUploadService.upload(options);
    }
}
