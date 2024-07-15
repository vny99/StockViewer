import { all } from "redux-saga/effects";
import { watchFetchStocks } from "./stockSaga";

export default function*  rootSaga(){
    yield all([
        watchFetchStocks()
    ])
}