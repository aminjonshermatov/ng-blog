import {createReducer, on} from "@ngrx/store";
import {Login, LoginFailed, LoginSuccess, LogoutSuccess} from "./admin-auth.actions";

export const ADMIN_AUTH_FEATURE_NAME = 'admin-auth';

export interface AuthData {
  accessToken: string;
  id: number;
  iat: number;
  exp: number;
}

export interface AdminAuthState {
  loading: boolean;
  loaded: boolean;
  serverError: string;
  authData?: AuthData;
}

const initialState: AdminAuthState = {
  loading: false,
  loaded: true,
  serverError: ''
};

export const adminAuthReducer = createReducer(
  initialState,
  on(Login, (state) => ({
    ...state,
    loading: true,
    loaded: false
  })),
  on(LoginSuccess, (state, { authData }) => ({
    ...state,
    authData,
    loaded: true,
    loading: false,
    serverError: ''
  })),
  on(LoginFailed, (state, { serverError }) => ({
    ...state,
    authData: undefined,
    loading: false,
    loaded: true,
    serverError
  })),
  on(LogoutSuccess, () => ({
    ...initialState,
    authData: undefined
  }))
);
