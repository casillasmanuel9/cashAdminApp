import { User } from './../../models/users.model';
import { createAction, props } from '@ngrx/store';

export const cargarUsuarioSuccess = createAction(
  '[Usuario] CargarUsuarioSuccess',
  props<{ usuario: User }>()
);
