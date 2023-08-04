import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {loadState, saveState} from "./localStorage";

export const initialState = loadState();
export const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
    devTools:true
});

store.subscribe(() => {
    saveState(
        store.getState()
    );
});



