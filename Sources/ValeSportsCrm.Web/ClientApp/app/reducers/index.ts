import {
    ActionReducerMap,
    ActionReducer
} from "@ngrx/store";
import { RouterStateUrl } from "../utils";
import * as fromRouter from "@ngrx/router-store";

export interface IState {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<IState> = {
    routerReducer: fromRouter.routerReducer,
};