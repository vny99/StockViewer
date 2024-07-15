import "dotenv/config";
import { STOCKS } from "../app/data/mockData.js";
const baseUrl: string = process.env.NEXT_PUBLIC_STOCKS_URL ?? ''
const apiKey: string = process.env.NEXT_PUBLIC_STOCKS_API_KEY ?? ''
const stocksApiUrl: string = process.env.NEXT_PUBLIC_STOCKS_API_URL ?? ''

export async function fetchAndSaveStocks() {

    const apiUrl = buildUrl();
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.error('Failed to fetch stocks');
            return;
        }
        const data = await response.json();
       try {
        await fetch(stocksApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
       } catch (error) {
        console.error('Failed to save stocks', error);
       }
    } catch (error) {
        console.error('Failed to fetch stocks', error); 
    }

}

const buildUrl = (): string => {
    if (!baseUrl) {
        console.error('Stocks API URL is missing');
    }
    let apiUrl = baseUrl + '/?tickers=';
    if (!apiKey) {
        console.error('Stocks API Key is missing');
    }
    STOCKS.forEach(stock => {
        apiUrl += `${stock},`;
    })
    apiUrl = apiUrl.slice(0, -1);
    apiUrl += `&token=${apiKey}`;
    return apiUrl;
}

export async function deleteOldStock() {
   try {
    await fetch('http://localhost:3000/pages/api/stocks', {
        method: 'DELETE',
    });
   } catch (error) {
    console.error('Failed to delete old stocks');
   }
}