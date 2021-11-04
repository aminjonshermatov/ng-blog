import {createAction, props} from "@ngrx/store";
import {NestedTreeNode} from "./admin-menu.reducer";

export const InitMenu = createAction(
  '[Admin Menu] Init Menu'
);

export const InitMenuSuccess = createAction(
  '[Admin Menu] Init Menu Success',
  props<{ data: NestedTreeNode[] }>()
);

export const InitMenuFailed = createAction(
  '[Admin Menu] Init Menu Failed',
  props<{ serverError: string }>()
);
