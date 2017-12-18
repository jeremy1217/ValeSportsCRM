import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { IHaveId } from "../models/state.model";

export class ApiService<T extends IHaveId> {
    constructor(protected http: HttpClient, private _baseUrl: string) {
    }

    getItem(id: string): Observable<T> {
        return this.http.get<T>(`${this._baseUrl}/${id}`);
    }

    saveItem(item: T): Observable<T> {
        if (item.id) {
            return this.http.put<T>(`${this._baseUrl}/${item.id}`, item);
        }
        return this.http.post<T>(this._baseUrl, item);
    }

    getItems(): Observable<T[]> {
        return this.http.get<T[]>(`${this._baseUrl}/list`);
    }
}
