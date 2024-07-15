import { IStock } from "@/app/models/stock";

export const FETCH_STOCKS_REQUEST = 'FETCH_STOCKS_REQUEST';
export const FETCH_STOCKS_SUCCESS = 'FETCH_STOCKS_SUCCESS';
export const FETCH_STOCKS_FAILURE = 'FETCH_STOCKS_FAILURE';
export const FETCH_TOP_STOCKS_REQUEST = 'FETCH_TOP_STOCKS_REQUEST';
export const FETCH_TOP_STOCKS_SUCCESS = 'FETCH_TOP_STOCKS_SUCCESS';
export const FETCH_TOP_STOCKS_FAILURE = 'FETCH_TOP_STOCKS_FAILURE';
export const UPDATE_STOCK_REQUEST = 'UPDATE_STOCK_REQUEST';
export const UPDATE_STOCK_SUCCESS = 'UPDATE_STOCK_SUCCESS';
export const UPDATE_STOCK_FAILURE = 'UPDATE_STOCK_FAILURE';
export const SET_MODAL_OPEN = 'SET_MODAL_OPEN';
export const SET_SELECTED_STOCK_ID = 'SET_SELECTED_STOCK_ID';
export const SET_FORM_DATA = 'SET_FORM_DATA';
export const CLEAR_FORM_DATA = 'CLEAR_FORM_DATA';

export const fetchStocksRequest = (data: string) => {
    return {
        type: FETCH_STOCKS_REQUEST,
        payload: data
    }
}

export const fetchStocksSuccess = (data: IStock[]) => {
    return{
        type: FETCH_STOCKS_SUCCESS,
        payload: data
    }
}

export const fetchStocksFailure = (error: string) => {
    return {
        type: FETCH_STOCKS_FAILURE,
        payload: error
    }
}

export const updateStockRequest = () => {
    return {
        type: UPDATE_STOCK_REQUEST
    }
}

export const updateStockSuccess = (data: IStock) => {
    return {
        type: UPDATE_STOCK_SUCCESS,
        payload: data
    }
}


export const updateStockFailure = (error: string) => {
    return {
        type: UPDATE_STOCK_FAILURE,
        payload: error
    }
}

export const setModalOpen = (value: boolean) => {
    return {
        type: SET_MODAL_OPEN,
        payload: value
    }
}

export const setSelectedStockId = (id: string) => {
    return {
        type: SET_SELECTED_STOCK_ID,
        payload: id
    }
}

export const setFormData = (data: Partial<IStock>): any => {
    return {
        type: SET_FORM_DATA,
        payload: data
    }
}

export const clearFormData = () => {
    return {
        type: CLEAR_FORM_DATA
    }
}

export const fetchTopStocksRequest = () => {
    return {
        type: FETCH_TOP_STOCKS_REQUEST
    }
}

export const fetchTopStocksSuccess = (data: IStock[]) => {
    return {
        type: FETCH_TOP_STOCKS_SUCCESS,
        payload: data
    }
}

export const fetchTopStocksFailure = (error: string) => {
    return {
        type: FETCH_TOP_STOCKS_FAILURE,
        payload: error
    }
}
