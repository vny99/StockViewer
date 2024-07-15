"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { FETCH_STOCKS_REQUEST, SET_MODAL_OPEN, } from "@/app/redux-saga/actions/actions";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../styles/globals.css'
import StockModal from "./StockModal";

interface TableProps {
    symbol: string;
}

const StockList: React.FC<TableProps> = ({ symbol}) => {

    const { stocks, loading, error, showModal } = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchStocks = () => {
            console.log("running for every minute")
            dispatch({ type: FETCH_STOCKS_REQUEST, payload: symbol });
        };

        fetchStocks();

        const intervalId = setInterval(fetchStocks, 60000);

        return () => clearInterval(intervalId);
    }, [symbol, dispatch]);

    const handleChangeStock = () =>{
        dispatch({type:SET_MODAL_OPEN, payload: true})
    }

    if (loading) {
        return <h3 style={{fontWeight: 'bold', fontFamily: "serif"}}>Loading...</h3>;
    }

    if (error) {
        return <h3 style={{fontWeight: 'bold', fontFamily: "serif"}}>{error}</h3>;
    }

    return (
       <>
        <div className="container m-2">
            <div className="row d-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginTop: "2rem", marginLeft:"10px", marginRight:"2rem" }}>
                <h2 className="text-primary border border-primary" style={{ fontSize: "1.5rem", fontFamily: "serif", fontWeight: "bold", width: "fit-content" , minHeight:"2.1rem"}}>{symbol}</h2>
                <button className="btn btn-primary" onClick={handleChangeStock} style={{ marginLeft: "1rem" , maxWidth:"10rem", maxHeight:"2.3rem"}}>ChangeStock</button>
            </div>
            <table className="table table-bordered my-custom-table" style={{ width: "99%" }}>
                <thead>
                    <tr>
                        <th className="headListContent" scope="col">Price</th>
                        <th className="headListContent" scope="col">Timestamp</th>
                        <th className="headListContent" scope="col">Open</th>
                        <th className="headListContent" scope="col">High</th>
                        <th className="headListContent" scope="col">Low</th>
                        <th className="headListContent" scope="col">Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks?.map((stock: any) => (
                        <tr key={stock.symbol}>
                            <td className="listContent">{stock.price}</td>
                            <td className="listContent">{new Date(stock.timeStamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + new Date(stock.timeStamp).toLocaleTimeString('en-US')}</td>
                            <td className="listContent">{stock.open}</td>
                            <td className="listContent">{stock.high}</td>
                            <td className="listContent">{stock.low}</td>
                            <td className="listContent">{stock.volume}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="">
            {showModal && <StockModal/>}
        </div>
       </>
    );
}


export default StockList