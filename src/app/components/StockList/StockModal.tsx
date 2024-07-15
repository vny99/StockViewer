import { STOCKS } from '@/app/data/mockData';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import { SET_MODAL_OPEN } from '@/app/redux-saga/actions/actions';
import React from 'react';

const StockModal: React.FC = () => {

    const { showModal } = useAppSelector(state => state)
    const dispatch = useAppDispatch();

    const navigateToStock = (symbol: string) => {
        window.location.href = `/pages/stockList/${encodeURIComponent(symbol)}`;
    }

    const handleClose = () => {
        dispatch({type: SET_MODAL_OPEN, payload: false})
    }

    return (
        <div className={showModal ? 'modal' : 'hidden'} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="modal-content d-flex align-items-center" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', width: '80%', maxWidth: '330px' }}>
                <h2>Select a Stock</h2>
                <div className="stock-list d-flex flex-column">
                    {STOCKS.map(stock => (
                        <button className='btn btn-warning' key={stock} onClick={() => navigateToStock(stock)} style={{ margin: '10px', padding: '3px', width:"10rem", height:"40px" }}>
                            {stock}
                        </button>
                    ))}
                </div>
                <button className='btn btn-danger' onClick={handleClose} style={{ marginTop: '20px', width:"15rem", height:"40px" }}>Close</button>
            </div>
        </div>
    );
};

export default StockModal;