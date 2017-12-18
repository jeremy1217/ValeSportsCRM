import * as App from "../actions/app";
import { ICustomer, IProgramType, ISport, IProgram } from "../models/state.model";

export interface IState {
    customers: ICustomer[];
    customer: ICustomer;

    programs: IProgram[];
    program: IProgram;

    sports: ISport[];
    programTypes: IProgramType[];
}

const initialState: IState = {
    customers: [],
    customer: null,
    programs: [],
    program: null,
    programTypes: [],
    sports: []
};

export function reducer(state: IState = initialState, action: App.Actions): IState {
    switch (action.type) {
        case App.INIT_OK: {
            return {
                ...state,
                sports: action.payload.sports,
                programTypes: action.payload.programTypes
            };
        }
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
        case App.PROGRAMS_OPEN_OK: {
            return {
                ...state,
                programs: action.payload
            };
        }
        case App.PROGRAM_OPEN_OK: {
            return {
                ...state,
                program: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

export const getCustomers = (state: IState) => state.customers;
export const getCustomer = (state: IState) => state.customer;

export const getPrograms = (state: IState) => state.programs;
export const getProgram = (state: IState) => state.program;

export const getSports = (state: IState) => state.sports;
export const getProgramTypes = (state: IState) => state.programTypes;
