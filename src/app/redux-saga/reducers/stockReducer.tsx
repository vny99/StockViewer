import { IStock } from "@/app/models/stock";
import { AppState } from "../store/store";
import { CLEAR_FORM_DATA, FETCH_STOCKS_FAILURE, FETCH_STOCKS_REQUEST, FETCH_STOCKS_SUCCESS, FETCH_TOP_STOCKS_FAILURE, FETCH_TOP_STOCKS_REQUEST, FETCH_TOP_STOCKS_SUCCESS, SET_FORM_DATA, SET_MODAL_OPEN, SET_SELECTED_STOCK_ID, UPDATE_STOCK_FAILURE, UPDATE_STOCK_REQUEST, UPDATE_STOCK_SUCCESS } from "../actions/actions";

const inaitialState: AppState = {
    stocks: [],
    error: '',
    loading: false,
    symbol: '',
    showModal: false,
    selectedStockId: '',
    data: {},
    topStocks: [],
}

const stockReducer = (state: AppState = inaitialState, action: any):AppState => {
    switch(action.type){
        case FETCH_STOCKS_REQUEST:
            return{
                ...state,
                loading: true,
                symbol: action.payload
            };
        case FETCH_STOCKS_SUCCESS:
            return{
                ...state,
                stocks: action.payload,
                loading: false
            };
        case FETCH_STOCKS_FAILURE:
            return{
                ...state,
                error: action.payload,
                loading: false
            };
        case UPDATE_STOCK_REQUEST:
            return{
                ...state,
                loading: true
            };
        case UPDATE_STOCK_SUCCESS:
            const updatedStocks = state.stocks.map((stock: IStock) => {
                if(stock.symbol === action.payload.symbol){
                    return action.payload
                }
                return stock
            });
            return{
                ...state,
                stocks: updatedStocks,
                loading: false
            };
        case UPDATE_STOCK_FAILURE:
            return{
                ...state,
                error: action.payload,
                loading: false
            };
        case SET_MODAL_OPEN:
            return{
                ...state,
                showModal: action.payload
            };
        case SET_SELECTED_STOCK_ID:
            return{
                ...state,
                selectedStockId: action.payload
            };
        case SET_FORM_DATA:
            return{
                ...state,
                data:{
                    ...state.data,
                    ...action.payload
                }
            };
        case CLEAR_FORM_DATA:
            return{
                ...state,
                data: {}
            };
        case FETCH_TOP_STOCKS_REQUEST:
            return{
                ...state,
                loading: true
            };
        case FETCH_TOP_STOCKS_SUCCESS:
            return{
                ...state,
                topStocks: action.payload,
                loading: false
            };
        case FETCH_TOP_STOCKS_FAILURE:
            return{
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}

export default stockReducer;