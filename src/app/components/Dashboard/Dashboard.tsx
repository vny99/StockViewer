"use client";
import { STOCKS } from "../../data/mockData";
import React, { useEffect } from "react";
import '../../styles/globals.css'
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { FETCH_TOP_STOCKS_REQUEST } from "@/app/redux-saga/actions/actions";
import 'bootstrap/dist/css/bootstrap.min.css'

const Dashboard: React.FC = () => {
    const { topStocks, loading, error } = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({ type: FETCH_TOP_STOCKS_REQUEST });
        console.log("Fetching top stocks");
    }, [dispatch]);

    const navigateToStock = (symbol: string) => {
        window.location.href = `/pages/stockList/${encodeURIComponent(symbol)}`;
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div className="container m-2">
            <h2 className="m-2" style={{ fontSize: "1.5rem", marginTop: "2rem" }}>Top Stocks</h2>
            <table className="table table-bordered my-custom-table" style={{ width: "97.5%" }}>
                <thead>
                    <tr>
                        <th className="headListContent" scope="col">Stock</th>
                        <th className="headListContent" scope="col">Price</th>
                        <th className="headListContent" scope="col">Timestamp</th>
                        <th className="headListContent" scope="col">Open</th>
                        <th className="headListContent" scope="col">High</th>
                        <th className="headListContent" scope="col">Low</th>
                        <th className="headListContent" scope="col">Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {topStocks?.map((stock: any) => (
                        <tr key={stock.symbol} onClick={() => navigateToStock(stock.symbol)}>
                            <td className="listContent">{stock.symbol}</td>
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
    );
}

export default Dashboard;
