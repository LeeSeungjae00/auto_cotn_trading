import { getNowPrice, postBuyCoin } from '../api/coin';
import { makeMALine } from '../utils/coinUtil';

interface coinType {
    id: string,
    coinDate: Date,
    coinMarket: string,
    volume: number,
    targetPrice: number
}

export default async function tradingCoin(coinList: coinType[]) {
    if (coinList.length === 0) throw new Error('CoinList is not update!');
    const coinName = coinList.map(coin => coin.coinMarket);
    const nowPrice = await getNowPrice(coinName);

    let buyCoin: string = '';

    for (let [index, coin] of coinList.entries()) {
        if (nowPrice[index].trade_price >= coin.targetPrice) {
            const MALine = await makeMALine(coin.coinMarket);
            console.log(MALine, nowPrice[index].trade_price)
            if (MALine < nowPrice[index].trade_price) {
                const resData = await postBuyCoin(coin.coinMarket, '10000');

                console.log(resData)

                console.log(`[매수]${coin.coinMarket} 을(를) ${nowPrice[index].opening_price}원에 매수 하였습니다.`);


                buyCoin = coin.coinMarket;
                return buyCoin;
            }
        }
    }
    return '';
}

