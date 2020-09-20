import { cargarUsuarioSuccess } from './../actions/users.actions';
import { User } from "./../../models/users.model";
import { createReducer, on } from "@ngrx/store";

export interface UsuarioState {
  user: User;
}

const usuarioInitialState: UsuarioState = {
  user: null
};

const _usuarioReducer = createReducer(
    usuarioInitialState,
    on(cargarUsuarioSuccess,
      (state, {usuario}) => ({...state, user: {...usuario}})
    ),
  );
  
  export function usuarioReducer(state, action) {
    return _usuarioReducer(state, action);
  }