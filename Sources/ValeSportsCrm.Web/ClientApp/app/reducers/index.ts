import {
    ActionReducerMap,
    ActionReducer
} from "@ngrx/store";
import { IRouterStateUrl } from "../utils";
import * as fromRouter from "@ngrx/router-store";

export interface IState {
    routerReducer: fromRouter.RouterReducerState<IRouterStateUrl>;
}

export const reducers: ActionReducerMap<IState> = {
    routerReducer: fromRouter.routerReducer,
}
