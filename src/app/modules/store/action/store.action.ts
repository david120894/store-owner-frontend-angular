import {createAction, props} from "@ngrx/store";
import {StoreDto} from "../../../models/store.dto";

export const listStore = createAction('list store',props<{store:StoreDto[]}>())
export const updateStore = createAction('update store',props<{store:StoreDto}>())
export const deleteStore =  createAction('delete store',props<{store:StoreDto}>())
