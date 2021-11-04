import {createAction, props} from "@ngrx/store";
import {AuthData} from "./admin-auth.reducer";

export const Login = createAction(
  '[Admin Auth] Login',
  props<{ login: string, password: string }>()
);

export const LoginSuccess = createAction(
  '[Admin Auth] Login Success',
  props<{ authData: AuthData }>()
);

export const LoginFailed = createAction(
  '[Admin Auth] Login Failed',
  props<{ serverError: string }>()
);

export const InitAdminAuth = createAction(
  '[Admin Auth] Init admin module'
);

export const LogoutSuccess = createAction(
  '[Admin Auth] Logout Success'
);

export const ExtractLoginData = createAction(
  '[Admin Auth] extract login data'
);

export const Logout = createAction(
  '[Admin Auth] Logout'
);
