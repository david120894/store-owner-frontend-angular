import {createFeatureSelector, createSelector} from "@ngrx/store";
import {StoreState} from "../reducer/store.reducer";

export const selectStoreState = createFeatureSelector<StoreState>('store')
export const selectStores = createSelector(
  selectStoreState,
  (state) => state.store
)

export const selectCurrentStore = createSelector(
  selectStoreState,
  (state) => state.currentStore
)
