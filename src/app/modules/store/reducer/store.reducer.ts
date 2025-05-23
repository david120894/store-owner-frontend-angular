import {StoreDto} from "../../../models/store.dto";
import {createReducer, on} from "@ngrx/store";
import {listStore, updateStore,deleteStore} from "../action/store.action";

export interface StoreState {
  store: StoreDto[]
  currentStore:StoreDto
}
export const initialState:StoreState = {
  store: [],
  currentStore:{}
}
export const storeReducer = createReducer(
  initialState,
  on(listStore,(state, {store}) => ({
    ...state,
    store: [...store],
    currentStore: store[0]
  })),

  on(updateStore, (state, { store }) => ({
    ...state,
    store: state.store.map(s =>
      s.id === store.id ? { ...store } : s
    ),
    currentStore: store
  })),

  on(deleteStore,(state,{store}) => ({
    ...state,
    store: state.store.filter(s => s.id !== store.id),
    currentStore: store
  }))
)
