import { STOCKS } from "../data/mockData";
import db from "../lib/dbConnect";
import { IStock, Stock } from "../models/stock";
/**
 * save the stock data
 * @param stock 
 * @returns stock
 */
export async function saveStock(stock: IStock): Promise<IStock> {
    await db;
    const stockDB = new Stock(stock)
    return await stockDB.save();
}

/**
 * update the stock data
 * @param stock 
 * @returns stock
 */
export async function updateStockById(stock:IStock): Promise<IStock> {
    await db;
    return await Stock.findByIdAndUpdate(stock._id, stock, { new: true }) as IStock;
}

/**
 * save the stocks data
 * @param stocks 
 * @returns stocks
 */
export async function saveStocks(stocks: IStock[]): Promise<IStock[]> {
    await db;
    return await Stock.insertMany(stocks);
}

/**
 * get all the stocks
 * @returns list of stocks
 */
export async function getAllStocks(): Promise<IStock[]> {
    await db;
    return await Stock.find();
}

/**
 * get the stocks by symbol
 * @param symbol 
 * @returns list of stocks
 */
export async function getStocksBySymbol(symbol: string): Promise<IStock[]>{
    await db;
    return await Stock.find({ symbol: symbol }).sort({ timeStamp: -1 }).limit(20);
}

/**
 * get the top 5 stocks
 * @returns list of stocks
 */
export async function getTopStocks(): Promise<IStock[]> {
    await db;
    return await Stock.aggregate([
        { $match: { symbol: { $in: STOCKS } } },
        { $sort: { timeStamp: -1 } },
        {
            $group: {
                _id: "$symbol",
                doc: { $first: "$$ROOT" }
            }
        },
        { $replaceRoot: { newRoot: "$doc" } },
        { $limit: 5 }
    ]);
}


/**
 * delete the stock data by id
 * @param id 
 */
export async function deleteOldStock() {
    await db;
    const date = new Date();
    date.setHours(date.getHours() - 1);
    console.log('Deleting stocks older than:', date)
    await Stock.deleteMany({ timeStamp: { $lt: date } });
}