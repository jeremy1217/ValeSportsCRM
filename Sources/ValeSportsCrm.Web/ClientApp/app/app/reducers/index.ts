import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromRoot from "../../reducers";
import * as fromApp from "./app";

export interface IAppState {
    app: fromApp.IState;
}

export const reducers = {
    app: fromApp.reducer
};

export interface IState extends fromRoot.IState {
    app: IAppState;
}

export const selectRootState = createFeatureSelector<IAppState>("app");
export const selectAppState = createSelector(
    selectRootState,
    (state: IAppState) => state.app
);

export const selectCustomers = createSelector(
    selectAppState,
    fromApp.getCustomers
);
export const selectCustomer = createSelector(
    selectAppState,
    fromApp.getCustomer
);

export const selectPrograms = createSelector(
    selectAppState,
    fromApp.getPrograms
);
export const selectProgram = createSelector(
    selectAppState,
    fromApp.getProgram
);

export const selectSports = createSelector(
    selectAppState,
    fromApp.getSports
);
export const selectProgramTypes = createSelector(
    selectAppState,
    fromApp.getProgramTypes
);
