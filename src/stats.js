import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

const main = document.querySelector(`.main`);
const BAR_HEIGHT = 50;

const renderChart = function (cards) {
  const watchedMovies = cards.filter(function (card) {
    return card.isWatched === true;
  });

  const totalDuration = watchedMovies.reduce((sum, elem) => sum + elem.time, 0);

  const watchedGenres = watchedMovies.map((elem) => elem.genre);

  const findRepeatedGenres = function (data) {
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

  const repeatedGenres = Object.entries(findRepeatedGenres(watchedGenres));

  const sortedGenres = repeatedGenres.sort(function (a, b) {
    return b.value - a.value;
  });

  const topSorted = sortedGenres.map((item) => item[0]);
  const topGenre = topSorted[0];

  const getStatsTemplate = function () {
    return `<section class="statistic">
      <p class="statistic__rank">Your rank <span class="statistic__rank-label">Sci-Fighter</span></p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters visually-hidden">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedMovies.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${moment.duration(totalDuration).hours()}<span class="statistic__item-description">h</span> ${moment.duration(totalDuration).minutes()}<span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`.trim();
  };


  main.insertAdjacentHTML(`beforeend`, getStatsTemplate());

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
          anchor: 'start',
          align: 'start',
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
