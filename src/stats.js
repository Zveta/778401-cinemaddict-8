import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

const BAR_HEIGHT = 50;
const statsText = document.querySelector(`.statistic__text-list`);
const statsChart = document.querySelector(`.statistic__chart-wrap`);

const renderChart = (cards) => {
  const watchedMovies = cards.filter((card) => card.isWatched === true);

  const totalDuration = watchedMovies.reduce((sum, elem) => sum + elem.runtime, 0);

  const watchedGenres = watchedMovies.map((elem) => elem.genre);

  const getGenres = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].split(`, `).length > 1 && arr[i] !== ``) {
        let splitString = arr[i].split(`, `);
        for (let j = 0; j < splitString.length; j++) {
          newArr.push(splitString[j]);
        }
      } else if (arr[i].split(`, `).length === 1 && arr[i] !== ``) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  };

  const findRepeatedGenres = (data) => {
    const result = {};
    for (let i = 0; i < data.length; i++) {
      let count = result[data[i]];
      if (count) {
        result[data[i]] = count + 1;
      } else {
        result[data[i]] = 1;
      }
    }
    return result;
  };

  const repeatedGenres = Object.entries(findRepeatedGenres(getGenres(watchedGenres)));

  const sortedGenres = repeatedGenres.sort((a, b) => b[1] - a[1]);

  const topSorted = sortedGenres.map((item) => item[0]);
  const topGenre = topSorted[0] !== undefined ? topSorted[0] : `no data`;

  const getStatsTemplate = () => {
    return `
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedMovies.length}<span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${moment.duration(totalDuration * 60000).hours()}<span class="statistic__item-description">h</span> ${moment.duration(totalDuration * 60000).minutes()}<span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
    `.trim();
  };

  const getChartTemplate = () => {
    return `
        <canvas class="statistic__chart" width="1000"></canvas>
    `.trim();
  };


  statsText.innerHTML = getStatsTemplate();
  statsChart.innerHTML = getChartTemplate();

  const chartLabels = sortedGenres.map((elem) => elem[0]);
  const chartData = sortedGenres.map((elem) => elem[1]);
  const statisticCtx = document.querySelector(`.statistic__chart`);
  statisticCtx.height = BAR_HEIGHT * chartLabels.length;

  const myChart = new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartLabels,
      datasets: [{
        data: chartData,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
  return myChart;
};

export {renderChart};
