import * as App from "../actions/app";
import { ICustomer } from "../models/state.model";

export interface IState {
    customers: ICustomer[];
    customer: ICustomer;
}

const initialState: IState = {
    customers: [],
    customer: null
};

export function reducer(state: IState = initialState, action: App.Actions): IState {
    switch (action.type) {
        case App.CUSTOMERS_OPEN_OK: {
            return {
                ...state,
                customers: action.payload
            };
        }
        case App.CUSTOMER_OPEN_OK: {
            return {
                ...state,
                customer: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

export const getCustomers = (state: IState) => state.customers;
export const getCustomer = (state: IState) => state.customer;
