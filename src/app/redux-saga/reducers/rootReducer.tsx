import { combineReducers } from "redux";
import stockReducer from "./stockReducer";
import { AppState } from "../store/store";



const rootReducer = (state: AppState, action: any): AppState =>{
    if(action.type === 'HYDRATE'){
        return{
            ...state,
            ...action.payload
        }
    }
    return stockReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;