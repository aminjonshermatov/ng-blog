import {createAction, props} from "@ngrx/store";

export const Login = createAction(
  '[Admin Auth] Login',
  props<{ login: string, password: string }>()
);

export const LoginSuccess = createAction(
  '[Admin Auth] Login Success',
  props<{ accessToken: string }>()
);

export const LoginFailed = createAction(
  '[Admin Auth] Login Failed',
  props<{ serverError: string }>()
);
