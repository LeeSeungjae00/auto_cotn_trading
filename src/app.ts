import express from 'express';
import CronJob from 'cron';
import checkCoinList from './checkCoinList';
import tradingCoin from './tradingCoin';
import sellingCoin from './sellingCoin';


const app = express();

let buyCoinName : string | boolean = false;
let candidateCoinsBuy : any = [];

let checkCoinListJob = new CronJob.CronJob('* 0 9 * * *', async () => {
    candidateCoinsBuy = await checkCoinList();
}, null, true)

let tradingSellingCoinJob = new CronJob.CronJob('* 0 10-23,0-9 * * *', async () => {
    if(!buyCoinName){
        buyCoinName = await tradingCoin(candidateCoinsBuy);
    }else{
        buyCoinName = await sellingCoin();
    }
    
}, null, true)
