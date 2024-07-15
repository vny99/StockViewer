import 'module-alias/register.js';
import 'dotenv/config.js';
import { deleteOldStock, fetchAndSaveStocks } from './src/scheduler/handleScheduler.js';
import express, { Request, Response } from 'express';
import next from 'next';
import cron from 'node-cron';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();


  cron.schedule('* * * * *', () => {
    //fetchAndSaveStocks()
    //deleteOldStock()
  });


  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });


  const port = process.env.PORT || 3000;
  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
