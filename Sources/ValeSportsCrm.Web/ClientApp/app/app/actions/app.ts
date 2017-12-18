import { Action } from "@ngrx/store";
import { RouterAction, ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { IMessage, ICustomer, ISport, IProgramType, IProgram } from "../models/state.model";

export const INIT_OK = "INIT_OK";
export const SHOW_MESSAGE = "SHOW_MESSAGE";

export const CUSTOMERS_OPEN_OK = "CUSTOMERS_OPEN_OK";
export const CUSTOMERS_UPLOAD = "CUSTOMERS_UPLOAD";
export const CUSTOMER_OPEN = "CUSTOMER_OPEN";
export const CUSTOMER_CREATE = "CUSTOMER_CREATE";
export const CUSTOMER_OPEN_OK = "CUSTOMER_OPEN_OK";
export const CUSTOMER_CANCEL = "CUSTOMER_CANCEL";
export const CUSTOMER_SAVE = "CUSTOMER_SAVE";
export const CUSTOMER_SAVE_OK = "CUSTOMER_SAVE_OK";

export const PROGRAMS_OPEN_OK = "PROGRAMS_OPEN_OK";
export const PROGRAM_OPEN = "PROGRAM_OPEN";
export const PROGRAM_CREATE = "PROGRAM_CREATE";
export const PROGRAM_OPEN_OK = "PROGRAM_OPEN_OK";
export const PROGRAM_CANCEL = "PROGRAM_CANCEL";
export const PROGRAM_SAVE = "PROGRAM_SAVE";
export const PROGRAM_SAVE_OK = "PROGRAM_SAVE_OK";

export class InitOk implements Action {
    readonly type = INIT_OK;
    constructor(public payload: {
        programTypes: IProgramType[],
        sports: ISport[]
    }) { }
}
export class CustomersOpenOk implements Action {
    readonly type = CUSTOMERS_OPEN_OK;
    constructor(public payload: ICustomer[]) { }
}
export class CustomersUpload implements Action {
    readonly type = CUSTOMERS_UPLOAD;
    constructor(public payload: {
        file: File;
    }) { }
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

export class ProgramsOpenOk implements Action {
    readonly type = PROGRAMS_OPEN_OK;
    constructor(public payload: IProgram[]) { }
}
export class ProgramCreate implements Action {
    readonly type = PROGRAM_CREATE;
    constructor() { }
}
export class ProgramOpen implements Action {
    readonly type = PROGRAM_OPEN;
    constructor(public payload: {
        id: string;
    }) { }
}
export class ProgramOpenOk implements Action {
    readonly type = PROGRAM_OPEN_OK;
    constructor(public payload: IProgram) { }
}
export class ProgramCancel implements Action {
    readonly type = PROGRAM_CANCEL;
    constructor() { }
}
export class ProgramSave implements Action {
    readonly type = PROGRAM_SAVE;
    constructor(public payload: IProgram) { }
}
export class ProgramSaveOk implements Action {
    readonly type = PROGRAM_SAVE_OK;
    constructor(public payload: IProgram) { }
}

export class ShowMessage implements Action {
    readonly type = SHOW_MESSAGE;
    constructor(public payload: IMessage) { }
}

export type Actions =
    InitOk
    | ShowMessage
    | CustomersOpenOk
    | CustomerOpen
    | CustomerCreate
    | CustomerOpenOk
    | CustomerCancel
    | CustomerSave
    | CustomerSaveOk
    | ProgramsOpenOk
    | ProgramOpen
    | ProgramCreate
    | ProgramOpenOk
    | ProgramCancel
    | ProgramSave
    | ProgramSaveOk
    ;
