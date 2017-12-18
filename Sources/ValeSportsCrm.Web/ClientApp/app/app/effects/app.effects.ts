import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect } from "@ngrx/effects";
import * as App from "../actions/app";
import { IMessage, ICustomer, IProgram } from "../models/state.model";
import { of } from "rxjs/observable/of";
import { from } from "rxjs/observable/from";
import { Observer } from "rxjs/observer";
import { Store, Action } from "@ngrx/store";
import * as fromApp from "../reducers";
import { TdDialogService } from "@covalent/core";
import { TdLoadingService } from "@covalent/core";
import { IState } from "../reducers/app";
import * as fromRoot from "../reducers";
import { fadeInContent } from "@angular/material";
import { ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { IRouterStateUrl } from "../../utils";
import { Observable } from "rxjs/Observable";
import { CustomerApiService } from "../services/customer-api.service";
import { ProgramApiService } from "../services/program-api.service";
import { SportApiService } from "../services/sport-api.service";
import { ProgramTypeApiService } from "../services/program-type-api.service";
import { forkJoin } from "rxjs/observable/forkJoin";
import { map, filter, tap, mergeMap } from "rxjs/operators";

@Injectable()
export class AppEffects {
    @Effect({ dispatch: false })
    showMessage$ = this._actions$
        .ofType(App.SHOW_MESSAGE)
        .do((action: App.ShowMessage) => {
            this._dialogService.openAlert({
                title: action.payload.header,
                message: action.payload.message
            });
        });

    @Effect()
    navigateToCustomers$ = this.handleNavigation("/app/customers", () => {
        const customers = this._customerApiService.getItems();
        const programTypes = this._programTypeApiService.getItems();
        const sports = this._sportApiService.getItems();
        return forkJoin([customers, programTypes, sports])
            .pipe(
            mergeMap((results: any[]) => {
                return from([
                    new App.CustomersOpenOk(results[0]),
                    new App.InitOk({
                        programTypes: results[1],
                        sports: results[2]
                    })
                ]);
            }));
    });
    @Effect()
    navigateToCustomer$ = this.handleNavigation("/app/customer/:id", (r: IRouterStateUrl) => {
        const id = this.getSegment(r, 3);
        if (id === "new") {
            return of(new App.CustomerOpenOk(<ICustomer>{
                address: null,
                birthDate: null,
                email: null,
                firstName: null,
                id: 0,
                lastName: null,
                phone: null,
                sports: []
            }));
        }
        return this._customerApiService.getItem(id)
            .map((resp) => new App.CustomerOpenOk(resp));
    });
    @Effect()
    customersUpload$ = this._actions$
        .ofType(App.CUSTOMERS_UPLOAD)
        .do((action: App.CustomersUpload) => {
            return this._customerApiService.upload(action.payload.file)
                .map(() => {
                    this._customerApiService.getItems()
                        .map((resp) => new App.CustomersOpenOk(resp));
                })
                .catch((error) => {
                    return of(new App.ShowMessage({
                        header: "Error",
                        message: "Failed to import customers. Please try again."
                    }));
                });
        });
    @Effect({ dispatch: false })
    customerOpen$ = this._actions$
        .ofType(App.CUSTOMER_OPEN)
        .do((action: App.CustomerOpen) =>
            this._router.navigate(["/app", "customer", action.payload.id]));
    @Effect({ dispatch: false })
    customerCreate$ = this._actions$
        .ofType(App.CUSTOMER_CREATE)
        .do((action: App.CustomerCreate) =>
            this._router.navigate(["/app", "customer", "new"]));
    @Effect({ dispatch: false })
    customerSaveOk$ = this._actions$
        .ofType(App.CUSTOMER_SAVE_OK)
        .do((action: App.CustomerSaveOk) =>
            this._router.navigate(["/app", "customers"]));

    @Effect({ dispatch: false })
    customerCancel$ = this._actions$
        .ofType(App.CUSTOMER_CANCEL)
        .do((action: App.CustomerCancel) =>
            this._router.navigate(["/app", "customers"]));
    @Effect()
    customerSave$ = this._actions$
        .ofType(App.CUSTOMER_SAVE)
        .switchMap((action: App.CustomerSave) => {
            return this._customerApiService.saveItem(action.payload)
                .map((m) => new App.CustomerSaveOk(m))
                .catch((error) => of(new App.ShowMessage({
                    header: "Error",
                    message: "Failed to save customer. Please try again."
                })));
        });

    @Effect()
    navigateToPrograms$ = this.handleNavigation("/app/programs", () => {
        const programs = this._programApiService.getItems();
        const programTypes = this._programTypeApiService.getItems();
        const sports = this._sportApiService.getItems();
        return forkJoin([programTypes, sports, programs])
            .pipe(
            mergeMap((results: any[]) => {
                return from([
                    new App.ProgramsOpenOk(results[0]),
                    new App.InitOk({
                        programTypes: results[1],
                        sports: results[2]
                    })
                ]);
            }));
    });
    @Effect()
    navigateToProgram$ = this.handleNavigation("/app/program/:id", (r: IRouterStateUrl) => {
        const id = this.getSegment(r, 3);
        if (id === "new") {
            return of(new App.ProgramOpenOk(<IProgram>{
                name: null,
                type: null,
                startDate: null,
                endDate: null,
                id: 0,
                price: 0
            }));
        }
        return this._programApiService.getItem(id)
            .map((resp) => new App.ProgramOpenOk(resp));
    });
    @Effect({ dispatch: false })
    programOpen$ = this._actions$
        .ofType(App.PROGRAM_OPEN)
        .do((action: App.ProgramOpen) =>
            this._router.navigate(["/app", "program", action.payload.id]));
    @Effect({ dispatch: false })
    programCreate$ = this._actions$
        .ofType(App.PROGRAM_CREATE)
        .do((action: App.ProgramCreate) =>
            this._router.navigate(["/app", "program", "new"]));
    @Effect({ dispatch: false })
    programSaveOk$ = this._actions$
        .ofType(App.PROGRAM_SAVE_OK)
        .do((action: App.ProgramSaveOk) =>
            this._router.navigate(["/app", "programs"]));
    @Effect({ dispatch: false })
    programCancel$ = this._actions$
        .ofType(App.PROGRAM_CANCEL)
        .do((action: App.ProgramCancel) =>
            this._router.navigate(["/app", "programs"]));
    @Effect()
    programSave$ = this._actions$
        .ofType(App.PROGRAM_SAVE)
        .switchMap((action: App.ProgramSave) => {
            return this._programApiService.saveItem(action.payload)
                .map((m) => new App.ProgramSaveOk(m))
                .catch((error) => of(new App.ShowMessage({
                    header: "Error",
                    message: "Failed to save program. Please try again."
                })));
        });

    constructor(protected _actions$: Actions,
        private _store: Store<IState>,
        private _router: Router,
        private _customerApiService: CustomerApiService,
        private _programApiService: ProgramApiService,
        private _programTypeApiService: ProgramTypeApiService,
        private _sportApiService: SportApiService,
        private _dialogService: TdDialogService
    ) {
    }

    private getSegment(r: IRouterStateUrl, i: number) {
        return r.url.split("/")[i];
    }

    private handleNavigation(segment: string, callback: (a: IRouterStateUrl, state: any) => Observable<any>) {
        const nav = this._actions$.ofType(ROUTER_NAVIGATION)
            .map((r) => (r as RouterNavigationAction).payload.routerState)
            .filter((s) => {
                // segment can consist of :parameters, handle them
                const u = s.url.split("/");
                const se = segment.split("/");
                if (u.length !== se.length) {
                    return false;
                }
                let found = true;
                let i = 0;
                se.forEach((m) => {
                    if (m === "" || se[i].startsWith(":") || !found) {
                        // skip
                    } else {
                        found = m === u[i];
                    }
                    i++;
                });
                return found;
            });
        return nav.withLatestFrom(this._store).switchMap((a) => {
            const b: IRouterStateUrl = a[0] as any as IRouterStateUrl;
            return callback(b, a[1]);
        }).catch((e) => {
            return of();
        });
    }
}
