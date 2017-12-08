import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect } from "@ngrx/effects";
import * as App from "../actions/app";
import { IMessage, ICustomer } from "../models/state.model";
import { of } from "rxjs/observable/of";
import { Observer } from "rxjs/observer";
import { Store, Action } from "@ngrx/store";
import * as fromApp from "../reducers";
import { TdDialogService } from "@covalent/core";
import { TdLoadingService } from "@covalent/core";
import { IState } from "../reducers/app";
import * as fromRoot from "../reducers";
import { fadeInContent } from "@angular/material";
import { ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { RouterStateUrl } from "../../utils";
import { Observable } from "rxjs/Observable";
import { CustomerApiService } from "../services/customer-api.service";

@Injectable()
export class AppEffects {
    @Effect()
    navigateToCustomers$ = this.handleNavigation("/app/customers/:page", (r: RouterStateUrl) => {
        return this._customerApiService.getItems(+this.getSegment(r, 3), this._pageSize)
            .map((resp) => new App.CustomersOpenOk(resp));
    });
    @Effect()
    navigateToCustomer$ = this.handleNavigation("/app/customer/:id", (r: RouterStateUrl) => {
        const id = this.getSegment(r, 3);
        if (id === "new") {
            return of(new App.CustomerOpenOk(<ICustomer>{
                address: null,
                birthDate: null,
                email: null,
                firstName: null,
                id: null,
                lastName: null,
                phone: null,
                sports: []
            }));
        }
        return this._customerApiService.getItem(id)
            .map((resp) => new App.CustomerOpenOk(resp));
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
            this._router.navigate(["/app", "customers", 1]));

    @Effect({ dispatch: false })
    customerCancel$ = this._actions$
        .ofType(App.CUSTOMER_CANCEL)
        .do((action: App.CustomerCancel) =>
            this._router.navigate(["/app", "customers", 1]));

    @Effect()
    customerSave$ = this._actions$
        .ofType(App.CUSTOMER_SAVE_OK)
        .switchMap((action: App.CustomerSave) => {
            return this._customerApiService.saveItem(action.payload)
                .map((m) => new App.CustomerSaveOk(m))
                .catch((error) => of(new App.ShowMessage({
                    header: "Error",
                    message: "Failed to save customer. Please try again."
                })));
        });

    @Effect({ dispatch: false })
    showMessage$ = this._actions$
        .ofType(App.SHOW_MESSAGE)
        .do((action: App.ShowMessage) => {
            this._dialogService.openAlert({
                title: action.payload.header,
                message: action.payload.message
            });
        });

    private _pageSize = 10;

    constructor(protected _actions$: Actions,
        private _store: Store<IState>,
        private _router: Router,
        private _customerApiService: CustomerApiService,
        private _dialogService: TdDialogService
    ) {
    }

    private getSegment(r: RouterStateUrl, i: number) {
        return r.url.split("/")[i];
    }

    private handleNavigation(segment: string, callback: (a: RouterStateUrl, state: any) => Observable<any>) {
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
            const b: RouterStateUrl = a[0] as any as RouterStateUrl;
            return callback(b, a[1]);
        }).catch((e) => {
            return of();
        });
    }
}
