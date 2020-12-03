/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
  let lastDay = prices.length;
  if(lastDay < 2){ //not enough days to buy and sell
    return 0;
  }

  let day0 = 0;
  let day1 = 1;

  if(lastDay === 2){ //We have to buy and sel the next day, or not buy at all
    if(prices[day1] > (prices[day0] + fee) ){
      return prices[day1] - (prices[day0] - fee);
    }
    else{ //prices[0] < (prices[1] + fee), so we don't buy
      return 0;
    }
  }
  else{ //Solving with dynamic programming
    let stocks = Array.from(Array(lastDay), () => new Array(2)); //Create a 2d array dp[0->prices.length][0->1]
    let have = 1; //For each day we either have the stock,
    let dontHave = 0; //...Or we don't.

    stocks[day0][dontHave] = 0; //The first day (day0): if we don't buy the stock, our balance will be 0
    stocks[day0][have] = -prices[day0] - fee; //The first day (day0): if we buy the stock, the our balance is negative whatever the stock price is that day
    stocks[day1][dontHave] = Math.max(stocks[day0][dontHave], stocks[day0][have] + prices[day1]); //The second day (day1): if we don't have the stock, it means we either never had it, or we had it yestarday (day0) and we sold it today for today's price. We choose the maximum of the two choices (the one that gives us higher profit)
    stocks[day1][have] = Math.max(stocks[day0][have], stocks[day0][dontHave] - prices[day1] - fee); //The second day (day1): if we have the stock, it means we either bought it yesterday and didn't sell today, or we didn't have it yesterday, and we bought it today to todays price.

    for(let thisDay = 2; thisDay < lastDay; thisDay++){ //Now we fill out the rest of our array.
      stocks[thisDay][dontHave] = Math.max(stocks[thisDay-1][dontHave], stocks[thisDay-1][have] + prices[thisDay]);
      stocks[thisDay][have] = Math.max(stocks[thisDay-1][have], stocks[thisDay-1][dontHave] - prices[thisDay] - fee);
    }
    return stocks[lastDay-1][dontHave];  //We return the final day where we don't have stocks. Since we don't want to buy on the final day, or have unsold stocks (we want max profit).
  }
};


console.log(maxProfit([1, 3, 2, 8, 4, 9], 2));
