import * as App from "../actions/app";
import { ICustomer } from "../models/state.model";

export interface IState {
    contacts: ICustomer[];
}

const initialState: IState = {
    contacts: []
};

export function reducer(state: IState = initialState, action: App.Actions): IState {
    switch (action.type) {
        case App.CUSTOMERS_OPEN_OK: {
            return {
                ...state
            };
        }
        case App.CUSTOMER_OPEN: {
            return {
                ...state
            };
        }
        default: {
            return state;
        }
    }
}

export const getContacts = (state: IState) => state.contacts;
