import { IStock, mapToIStock } from "@/app/models/stock";
import { deleteOldStock, getAllStocks, getStocksBySymbol, getTopStocks, saveStock, saveStocks, updateStockById } from "@/app/service/stocksService";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/stocks
 * GET /api/stocks?symbol=XXX
 * GET /api/stocks?top=true
 * The GET method is used to fetch the stock based on the given criteria
 * @param req
 * @returns list of Stocks
 * @throws exception if any error occurs
 */
export async function GET(req:NextRequest): Promise<NextResponse> {
    const url = new URL(req.url);
    const params = url.searchParams;
    if(params.has('symbol')) {
        try{
            const symbol = params.get('symbol');
            if (symbol !== null) {
              return NextResponse.json(await getStocksBySymbol(symbol));
            } else {
              return NextResponse.json({ error: 'Symbol is null' });
            }
        }
        catch(error){
            return NextResponse.json({ error: error });
        }
    }

    if(params.has('top')){
        try{
            return NextResponse.json(await getTopStocks());
        }
        catch(error){
            return NextResponse.json({ error: error });
        }
    }
    try {
        return NextResponse.json(await getAllStocks());
    } catch (error) {
        return NextResponse.json({ error: error });
    }
}

/**
 * POST /api/stocks
 * The POST method is used to save the stock data
 * @param req 
 * @returns List of Stocks
 * @throws exception if any error occurs
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
    const stock = await req.json();
    try {
        if(Array.isArray(stock)){
            let stocks: IStock[] = stock.map(mapToIStock)
            return NextResponse.json(await saveStocks(stocks));
        }
        return NextResponse.json(updateStockById(stock));
    } catch (error) {
       return NextResponse.json({ error: error }); 
    }
}

/**
 * DELETE /api/stocks
 * The DELETE method is used to delete the old stock data, runs on sheduler
 * @returns message if old stocks are deleted
 * @throws exception if any error occurs
 */
export async function DELETE(): Promise<NextResponse> {
    try {
        await deleteOldStock();
        return NextResponse.json({ message: 'Old stocks deleted' });
    } catch (error) {
        return NextResponse.json({ error: error });
    }
}

