import {createReducer, on} from "@ngrx/store";
import {InitMenu, InitMenuFailed, InitMenuSuccess} from "./admin-menu.actions";
import {LogoutSuccess} from "../../admin-auth-store/store/admin-auth.actions";

export const ADMIN_MENU_FEATURE_NAME = 'admin menu';

export interface NestedTreeNode {
  name: string;
  href?: string;
  icon?: string;
  children?: NestedTreeNode[];
}

export interface AdminMenuState {
  loading: boolean;
  loaded: boolean;
  serverError: string;
  data?: NestedTreeNode[];
}

const initialState: AdminMenuState = {
  loading: false,
  loaded: false,
  serverError: '',
  data: []
}

export const adminMenuReducer = createReducer(
  initialState,
  on(InitMenu, (state) => state.loaded ? state : { ...state, loading: true }),
  on(InitMenuSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    loaded: true,
    serverError: '',
    data
  })),
  on(InitMenuFailed, (state, { serverError }) => ({
    ...state,
    loading: false,
    loaded: true,
    serverError,
    data: []
  })),
  on(LogoutSuccess, () => initialState)
);
