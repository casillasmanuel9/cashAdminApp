import { createAction, props } from '@ngrx/store';
import { Entry } from 'src/app/models/entry.model';

export const loadEntries = createAction(
    '[Entries] loadEntries'
);

export const loadEntriesSuccess = createAction(
    '[Entries] loadEntriesSuccess',
    props<{entries: Entry[]}>()
);

export const addNewEntry = createAction(
    '[Entries] addNewEntry',
    props<{entry: Entry}>()
);