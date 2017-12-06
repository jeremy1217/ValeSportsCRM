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

export const selectContacts = createSelector(
    selectAppState,
    fromApp.getContacts
);
