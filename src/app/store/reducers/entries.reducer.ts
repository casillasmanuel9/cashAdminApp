import { createReducer, on, State } from '@ngrx/store';
import { Entry } from 'src/app/models/entry.model';
import { loadEntries, loadEntriesSuccess } from '../actions';

export interface EntriesState {
    entries: Entry[],
    loading: boolean,
    loaded: boolean,
    category: string,
    date: number
};

const initialState: EntriesState = {
    entries: [],
    loading: false,
    loaded: false,
    category: '',
    date: 0,
};

export const entriesReducer = createReducer(
    initialState,
    on(
        loadEntries,
        (state) => ({...state, loading: true, loaded: false}),
    ),
    on(
        loadEntriesSuccess,
        (state, {entries}) => ({...state, loading: false, loaded: true, entries})
    )
);