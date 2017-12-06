import { Action } from "@ngrx/store";
import { RouterAction, ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { IMessage, ICustomer } from "../models/state.model";

export const CUSTOMERS_OPEN_OK = "CUSTOMERS_OPEN_OK";
export const CUSTOMER_OPEN = "CUSTOMER_OPEN";
export const SHOW_MESSAGE = "SHOW_MESSAGE";

export class CustomersOpened implements Action {
    readonly type = CUSTOMERS_OPEN_OK;
    constructor(public payload: {
        contacts: ICustomer[]
    }) { }
}
export class CustomerOpen implements Action {
    readonly type = CUSTOMER_OPEN;
    constructor(public payload: {
        id: string;
    }) { }
}
export class ShowMessage implements Action {
    readonly type = SHOW_MESSAGE;
    constructor(public payload: IMessage) { }
}

export type Actions =
    CustomersOpened
    | CustomerOpen
    | ShowMessage;
