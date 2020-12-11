import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
  usuario: reducers.UsuarioState,
  entries: reducers.EntriesState
}

export const appReducers: ActionReducerMap<AppState> = {
  usuario: reducers.usuarioReducer,
  entries: reducers.entriesReducer
}
