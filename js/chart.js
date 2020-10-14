var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5'], // products go here
    datasets: [{
      label: 'BusMall Product Poll', // this is my title
      data: [10, 9, 8, 7, 6, 5], // number of votes
      barPercentage: 0.5,
      // barThickness: 10,
      // maxBarThickness: 8,
      // minBarLength: 2,
      backgroundColor: [
        'rgba(255, 255, 255, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(44, 44, 44, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 6
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
