import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ADMIN_MENU_FEATURE_NAME, AdminMenuState} from "./admin-menu.reducer";

const adminMenuSelector = createFeatureSelector<AdminMenuState>(ADMIN_MENU_FEATURE_NAME);

export const getLoading = createSelector(
  adminMenuSelector,
  (state) => state.loading
);

export const getLoaded = createSelector(
  adminMenuSelector,
  (state) => state.loaded
);

export const getServerError = createSelector(
  adminMenuSelector,
  (state) => state.serverError
);

export const getMenuData = createSelector(
  adminMenuSelector,
  (state) => state.data || []
);
