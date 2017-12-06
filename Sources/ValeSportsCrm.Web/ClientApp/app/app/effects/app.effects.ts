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

@Injectable()
export class AppEffects {
    /*@Effect()
    navigateToContacts$ = this.handleNavigation("/app/contacts", (r: RouterStateUrl) => {
        return this._contactApiService.getItems(this.getSkip(r), this._pageSize)
            .map((resp) => new App.ContactsOpened(resp));
    });*/

    @Effect({ dispatch: false })
    contactOpen$ = this._actions$
        .ofType(App.CUSTOMER_OPEN)
        .do((action: App.CustomerOpen) =>
            this._router.navigate(["/app/customer"], {
                queryParams:
                    {
                        id: action.payload.id
                    }
            }));

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
        //private _contactApiService: ContactApiService,
        private _dialogService: TdDialogService
    ) {
    }

    private getSkip(route: RouterStateUrl): number {
        const page = route.queryParams.page ? +route.queryParams.page - 1 : 0;
        return page * this._pageSize;
    }

    private handleNavigation(segment: string, callback: (a: RouterStateUrl, state: any) => Observable<any>) {
        const nav = this._actions$.ofType(ROUTER_NAVIGATION)
            .map((r) => (r as RouterNavigationAction).payload.routerState)
            .filter((s) => {
                return s.url === segment;
            });
        return nav.withLatestFrom(this._store).switchMap((a) => {
            const b: RouterStateUrl = a[0] as any as RouterStateUrl;
            return callback(b, a[1]);
        }).catch((e) => {
            return of();
        });
    }
}
