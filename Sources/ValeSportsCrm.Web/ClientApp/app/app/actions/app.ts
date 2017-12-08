import { Action } from "@ngrx/store";
import { RouterAction, ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { IMessage, ICustomer } from "../models/state.model";

export const CUSTOMERS_OPEN_OK = "CUSTOMERS_OPEN_OK";
export const CUSTOMER_OPEN = "CUSTOMER_OPEN";
export const CUSTOMER_CREATE = "CUSTOMER_CREATE";
export const CUSTOMER_OPEN_OK = "CUSTOMER_OPEN_OK";
export const CUSTOMER_CANCEL = "CUSTOMER_CANCEL";
export const CUSTOMER_SAVE = "CUSTOMER_SAVE";
export const CUSTOMER_SAVE_OK = "CUSTOMER_SAVE_OK";
export const SHOW_MESSAGE = "SHOW_MESSAGE";

export class CustomersOpenOk implements Action {
    readonly type = CUSTOMERS_OPEN_OK;
    constructor(public payload: ICustomer[]) { }
}
export class CustomerCreate implements Action {
    readonly type = CUSTOMER_CREATE;
    constructor() { }
}
export class CustomerOpen implements Action {
    readonly type = CUSTOMER_OPEN;
    constructor(public payload: {
        id: string;
    }) { }
}
export class CustomerOpenOk implements Action {
    readonly type = CUSTOMER_OPEN_OK;
    constructor(public payload: ICustomer) { }
}
export class CustomerCancel implements Action {
    readonly type = CUSTOMER_CANCEL;
    constructor() { }
}
export class CustomerSave implements Action {
    readonly type = CUSTOMER_SAVE;
    constructor(public payload: ICustomer) { }
}
export class CustomerSaveOk implements Action {
    readonly type = CUSTOMER_SAVE_OK;
    constructor(public payload: ICustomer) { }
}
export class ShowMessage implements Action {
    readonly type = SHOW_MESSAGE;
    constructor(public payload: IMessage) { }
}

export type Actions =
    CustomersOpenOk
    | CustomerOpen
    | CustomerCreate
    | CustomerOpenOk
    | CustomerCancel
    | CustomerSave
    | CustomerSaveOk
    | ShowMessage;
