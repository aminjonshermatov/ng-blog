import {createAction, props} from "@ngrx/store";
import {AuthData} from "./admin-auth.reducer";

export const Login = createAction(
  '[Admin Auth] Login',
  props<{ login: string, password: string }>()
);

export const LoginSuccess = createAction(
  '[Admin Auth] Login Success',
  props<AuthData>()
);

export const LoginFailed = createAction(
  '[Admin Auth] Login Failed',
  props<{ serverError: string }>()
);
