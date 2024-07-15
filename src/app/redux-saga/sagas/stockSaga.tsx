import { IStock } from "@/app/models/stock";
import { call, put, takeEvery } from "redux-saga/effects";

const stocksApiUrl: string = process.env.NEXT_PUBLIC_STOCKS_API_URL ?? ''

function* fectchStocks(action: any): Generator<any, void, any> {
    try{
        const stocks = yield call(getAllStocks, action.payload);
        yield put({type: 'FETCH_STOCKS_SUCCESS', payload: stocks});
    }
    catch(error){
        yield put({type: 'FETCH_STOCKS_FAILURE', payload: error});
    }
}

function* fetchTopStocks(action: any): Generator<any, void, any> {
    try{
        const stocks = yield call(getTopStocks);
        yield put({type: 'FETCH_TOP_STOCKS_SUCCESS', payload: stocks});
    }
    catch(error){
        yield put({type: 'FETCH_TOP_STOCKS_FAILURE', payload: error});
    }
}

function* updateStock(action: any): Generator<any, void, any> {
    console.log(action.payload);
    try{
        const stock = yield call(saveStock, action.payload);
        yield put({type: 'UPDATE_STOCK_SUCCESS', payload: stock});
    }
    catch(error){
        yield put({type: 'UPDATE_STOCK_FAILURE', payload: error});
    }

}

function saveStock(stock: IStock) {
    console.log(stock)
    return fetch(stocksApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stock)
    }).then(response => response.json());

}

function getAllStocks(symbol: string){
   return fetch(`${stocksApiUrl}?symbol=${symbol}`).then(response => response.json());
}

function getTopStocks(){
    return fetch(`${stocksApiUrl}?top=true`).then(response => response.json());
}

export function* watchFetchStocks(){
    yield takeEvery('FETCH_STOCKS_REQUEST', fectchStocks);
    yield takeEvery('UPDATE_STOCK_REQUEST', updateStock);
    yield takeEvery('FETCH_TOP_STOCKS_REQUEST', fetchTopStocks);
}