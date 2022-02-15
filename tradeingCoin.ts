import { dbConnect, dbInit } from './utils/databases'
import { getTodayCoinList } from './lib/coinDatabase';

const nowDate = new Date();
const year = nowDate.getFullYear();
const month = nowDate.getMonth();
const date = nowDate.getDate();

interface coinType {
    id : string,
    coinDate : Date,
    coinMarket : string,
    volume : Number,
    targetPrice : Number
}

(async () => {
    const conn = dbInit();
    dbConnect(conn);

    const CoinList : any =  await getTodayCoinList(conn, 11);

    const coinNameList = CoinList.map((coin : coinType)=> coin.coinMarket);
    console.log(coinNameList);

    conn.end();
})()

