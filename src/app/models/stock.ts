import { model, models, Schema } from "mongoose";

export interface IStock {
    _id?: string;
    symbol: string;
    price: number;
    timeStamp: Date;
    open?: number;
    high?: number;
    low?: number;
    volume?: number;
}

interface ApiResponse {
    ticker: string;
    timestamp: string;
    lastSaleTimestamp: string;
    quoteTimestamp: string;
    open: number;
    high: number;
    low: number;
    mid: number | null;
    tngoLast: number;
    last: number;
    lastSize: number | null;
    bidSize: number | null;
    bidPrice: number | null;
    askPrice: number | null;
    askSize: number | null;
    volume: number;
    prevClose: number;
  }
  
export function mapToIStock(response: ApiResponse): IStock {
    return {
      symbol: response.ticker,
      price: response.last,
      timeStamp: new Date(response.timestamp),
      open: response.open,
      high: response.high,
      low: response.low,
      volume: response.volume
    };
  }

const stockSchema: Schema<IStock> = new Schema<IStock>({
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    timeStamp: { type: Date, required: true, default: Date.now },
    open: { type: Number },
    high: { type: Number },
    low: { type: Number },
    volume: { type: Number }
})

export const Stock = models.Stock || model<IStock>('Stock', stockSchema)