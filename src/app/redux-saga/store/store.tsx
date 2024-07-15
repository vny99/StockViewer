import { IStock } from "@/app/models/stock";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers/rootReducer";
import rootSaga from "../sagas/rootSaga";

export interface AppState {
    stocks: IStock[];
    loading: boolean;
    error?: string;
    symbol?: string;
    showModal: boolean;
    selectedStockId: string;
    data: Partial<IStock>;
    topStocks: IStock[];
}

const sagaMiddleware = createSagaMiddleware();

const saveState = (state: AppState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        return undefined;
    }

}

const loadState = (): AppState | undefined => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState) as AppState;
    } catch (error) {
        console.error("Could not load state from localStorage", error);
        return undefined;
    }
}

export const makeStore = () => {
    const preloadedState = loadState();
    const store = configureStore(
        {
            middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
            reducer: rootReducer
        });
    sagaMiddleware.run(rootSaga);
    store.subscribe(() => {
        saveState(store.getState());
    });
    return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;