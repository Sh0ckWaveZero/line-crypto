import nodeHtmlToImage from 'node-html-to-image'
import { Chart } from 'chart.js';

export class CommonService {

  getPlot = async (item: any) => {


    let createBtcChart

    const btcData = async () => {
      const response = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
      const json = await response.json();
      const data = json.Data.Data
      const times = data.map((obj: any) => obj.time)
      const prices = data.map((obj: any) => obj.high)
      return {
        times,
        prices
      }
    }

    async function printBtcChart() {
      // let { times, prices } = await btcData()

      // let btcChart = document.getElementById('btcChart').getContext('2d');

      // let gradient = btcChart.createLinearGradient(0, 0, 0, 400);

      // gradient.addColorStop(0, 'rgba(247,147,26,.5)');
      // gradient.addColorStop(.425, 'rgba(255,193,119,0)');

      // // Chart.defaults.global.defaultFontFamily = 'Red Hat Text';
      // // Chart.defaults.global.defaultFontSize = 12;

      // createBtcChart = new Chart(btcChart, {
      //   type: 'line',
      //   data: {
      //     labels: times,
      //     datasets: [{
      //       label: '$',
      //       data: prices,
      //       backgroundColor: gradient,
      //       borderColor: 'rgba(247,147,26,1)',
      //       borderJoinStyle: 'round',
      //       borderCapStyle: 'round',
      //       borderWidth: 3,
      //       pointRadius: 0,
      //       pointHitRadius: 10,
      //       lineTension: .2,
      //     }]
      //   },

      //   options: {
      //     title: {
      //       display: false,
      //       text: 'Heckin Chart!',
      //       fontSize: 35
      //     },

      //     legend: {
      //       display: false
      //     },

      //     layout: {
      //       padding: {
      //         left: 0,
      //         right: 0,
      //         top: 0,
      //         bottom: 0
      //       }
      //     },

      //     scales: {
      //       xAxes: [{
      //         display: false,
      //         gridLines: {}
      //       }],
      //       yAxes: [{
      //         display: false,
      //         gridLines: {}
      //       }]
      //     },

      //     tooltips: {
      //       callbacks: {
      //         //This removes the tooltip title
      //         title: function () { }
      //       },
      //       //this removes legend color
      //       displayColors: false,
      //       yPadding: 10,
      //       xPadding: 10,
      //       position: 'nearest',
      //       caretSize: 10,
      //       backgroundColor: 'rgba(255,255,255,.9)',
      //       bodyFontSize: 15,
      //       bodyFontColor: '#303030'
      //     }
      //   }
      // });
    }

    return await nodeHtmlToImage({
      output: 'src/assets/images/image.png',
      html: `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="styles.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Red+Hat+Text:400,500&display=swap" rel="stylesheet">
    <title>Issa Chart!</title>
    <style>
    h1 {
      font-size: 1.5em;
  }
  
  h2 {
      font-size: 1.25em;
  }
  
  h1, 
  h2, 
  p {
      font-family: 'Red Hat Text', sans-serif;
      color: #303030;
  }
  
  /// Card Container ///
  .container {
      display: flex;
      justify-content: center;
  }
  
  
  /// Cards ///
  cards {
      width: 90%;
      display: inline-flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-top: 30px;
      padding-bottom: 30px;
  }
  
  .btc,
  .cosmos,
  .ethereum {
      display: grid;
      width: 100%;
      grid-template-columns: 1fr;
      grid-template-rows: minmax(50px, 60px) 1fr;
      grid-template: 
          "info"
          "chart";
      border-radius: 30px;
  }
  
  .btc {
      box-shadow: 10px 10px 20px 1px rgba(247,147,26,.15);
  }
  
  .cosmos {
      box-shadow: 10px 10px 20px 1px rgba(46,49,72,.15);
  }
  
  .ethereum {
      box-shadow: 10px 10px 20px 1px rgba(78,56,216,.15);
  }
  
  .asset-info {
      grid-area: info;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5% 0 5%;
  }
  
  .title {
      display: inline-flex;
  }
  
  card h1 {
      margin-left: 10px;
  }
  
  
  /// Charts ///
  #btcChart,
  #cosmosChart,
  #ethereumChart {
      grid-area: chart;
      border-radius: 0px 0px 30px 30px;
      margin-top: auto;
  }
  </style>
</head>
<body>
  <container class="container">
    <cards class="cards">
        <bitcoin style="width: 100% height:100%" class="btc">
            <card class="asset-info padding: 35px">
                <div class="title">
                    <img src="https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg" width="15%"> 
                    <h1>Bitcoin</h1>
                </div>
                <div class="details">
                    <h2 class="asset-price" id="btcPrice"></h2>
                </div>
            </card>
            <canvas id="btcChart"></canvas>
        </bitcoin>
    </cards>
  </container>
</body>
<script>
///  Calling API and modeling data for each chart ///
const btcData = async () => {
  const response = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
  const json = await response.json();
  const data = json.Data.Data
  const times = data.map(obj => obj.time)
  const prices = data.map(obj => obj.high)
  return {
    times,
    prices
  }
}


const cosmosData = async () => {
  const response = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=ATOM&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
  const json = await response.json();
  const data = json.Data.Data
  const times = data.map(obj => obj.time)
  const prices = data.map(obj => obj.high)
  return {
    times,
    prices
  }
}


const ethereumData = async () => {
  const response = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=ETH&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
  const json = await response.json();
  const data = json.Data.Data
  const times = data.map(obj => obj.time)
  const prices = data.map(obj => obj.high)
  return {
    times,
    prices
  }
}


/// Error handling ///
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}



/// Charts ///
let createBtcChart
let createCosmosChart
let createethereumChart

async function printBtcChart() {
  let { times, prices } = await btcData()

  let btcChart = document.getElementById('btcChart').getContext('2d');

  let gradient = btcChart.createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, 'rgba(247,147,26,.5)');
  gradient.addColorStop(.425, 'rgba(255,193,119,0)');

  Chart.defaults.global.defaultFontFamily = 'Red Hat Text';
  Chart.defaults.global.defaultFontSize = 12;

  createBtcChart = new Chart(btcChart, {
    type: 'line',
    data: {
      labels: times,
      datasets: [{
        label: '$',
        data: prices,
        backgroundColor: gradient,
        borderColor: 'rgba(247,147,26,1)',
        borderJoinStyle: 'round',
        borderCapStyle: 'round',
        borderWidth: 3,
        pointRadius: 0,
        pointHitRadius: 10,
        lineTension: .2,
      }]
    },

    options: {
      title: {
        display: false,
        text: 'Heckin Chart!',
        fontSize: 35
      },

      legend: {
        display: false
      },

      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      },

      scales: {
        xAxes: [{
          display: false,
          gridLines: {}
        }],
        yAxes: [{
          display: false,
          gridLines: {}
        }]
      },

      tooltips: {
        callbacks: {
          //This removes the tooltip title
          title: function() {}
       },
        //this removes legend color
        displayColors: false,
        yPadding: 10,
        xPadding: 10,
        position: 'nearest',
        caretSize: 10,
        backgroundColor: 'rgba(255,255,255,.9)',
        bodyFontSize: 15,
        bodyFontColor: '#303030' 
      }
    }
  });
}



async function printCosmosChart() {
  let { times, prices } = await cosmosData()

  let cosmosChart = document.getElementById('cosmosChart').getContext('2d');

  let gradient = cosmosChart.createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, 'rgba(27,30,54,.5)');
  gradient.addColorStop(.425, 'rgba(46,49,72,0)');

  Chart.defaults.global.defaultFontFamily = 'Red Hat Text';
  Chart.defaults.global.defaultFontSize = 12;

  createCosmosChart = new Chart(cosmosChart, {
    type: 'line',
    data: {
      labels: times,
      datasets: [{
        label: "",
        data: prices,
        backgroundColor: gradient,
        borderColor: 'rgba(46,49,72,1)',
        borderJoinStyle: 'round',
        borderCapStyle: 'round',
        borderWidth: 3,
        pointRadius: 0,
        pointHitRadius: 10,
        lineTension: .2,
      }]
    },

    options: {
      title: {
        display: false,
        text: 'Heckin Chart!',
        fontSize: 35
      },

      legend: {
        display: false
      },

      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      },

      scales: {
        xAxes: [{
          display: false,
          gridLines: {}
        }],
        yAxes: [{
          display: false,
          gridLines: {}
        }]
      },

      tooltips: {
        callbacks: {
          //This removes the tooltip title
          title: function() {}
       },
        //this removes legend color
        displayColors: false,
        yPadding: 10,
        xPadding: 10,
        position: 'nearest',
        caretSize: 10,
        backgroundColor: 'rgba(255,255,255,.9)',
        bodyFontSize: 15,
        bodyFontColor: '#303030' 
      }
    }
  });
}


async function printEthereumChart() {
  let { times, prices } = await ethereumData()

  let ethereumChart = document.getElementById('ethereumChart').getContext('2d');

  let gradient = ethereumChart.createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, 'rgba(78,56,216,.5)');
  gradient.addColorStop(.425, 'rgba(118,106,192,0)');

  Chart.defaults.global.defaultFontFamily = 'Red Hat Text';
  Chart.defaults.global.defaultFontSize = 12;

  createEthereumChart = new Chart(ethereumChart, {
    type: 'line',
    data: {
      labels: times,
      datasets: [{
        label: '$',
        data: prices,
        backgroundColor: gradient,
        borderColor: 'rgba(118,106,192,1)',
        borderJoinStyle: 'round',
        borderCapStyle: 'round',
        borderWidth: 3,
        pointRadius: 0,
        pointHitRadius: 10,
        lineTension: .2,
      }]
    },

    options: {
      title: {
        display: false,
        text: 'Heckin Chart!',
        fontSize: 35
      },

      legend: {
        display: false
      },

      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      },

      scales: {
        xAxes: [{
          display: false,
          gridLines: {}
        }],
        yAxes: [{
          display: false,
          gridLines: {}
        }]
      },

      tooltips: {
        callbacks: {
          //This removes the tooltip title
          title: function() {}
       },
        //this removes legend color
        displayColors: false,
        yPadding: 10,
        xPadding: 10,
        position: 'nearest',
        caretSize: 10,
        backgroundColor: 'rgba(255,255,255,.9)',
        bodyFontSize: 15,
        bodyFontColor: '#303030' 
      }
    }
  });
}


/// Update current price ///
async function updateEthereumPrice() {
  let { times, prices } = await ethereumData()
  let currentPrice = prices[prices.length-1].toFixed(2);

  document.getElementById("ethPrice").innerHTML = "$" + currentPrice;
}

async function updateCosmosPrice() {
  let { times, prices } = await cosmosData()
  let currentPrice = prices[prices.length-1].toFixed(2);

  document.getElementById("atomPrice").innerHTML = "$" + currentPrice;
}

async function updateBitcoinPrice() {
  let { times, prices } = await btcData()
  let currentPrice = prices[prices.length-1].toFixed(2);

  document.getElementById("btcPrice").innerHTML = "$" + currentPrice;
}

updateEthereumPrice()
updateCosmosPrice()
updateBitcoinPrice()

printBtcChart()
printCosmosChart()
printEthereumChart()

</script>
</html>
      `
    })
  }

}