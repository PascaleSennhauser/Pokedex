/**
 * This function renders the chart in the pokedex-big.
 */
function renderchart() {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: namesStats,
        datasets: [{
          label: 'base_stats',
          data: numbersStats,
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 280,
            ticks: {
                stepSize: 40
            }
          }
        }
      }
    });
}

