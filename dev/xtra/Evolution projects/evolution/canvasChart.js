const ctxChart = document.getElementById("chartCanvas").getContext("2d");
let labels = [];
let blueData = [],
  redData = [],
  greenData = [];
let maxDataPoints = 50;

const chart = new Chart(ctxChart, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Blue Particles",
        data: blueData,
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Red Particles",
        data: redData,
        borderColor: "red",
        fill: false,
      },
      {
        label: "Green Particles",
        data: greenData,
        borderColor: "green",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } },
  },
});

function updateChart(blue, red, green) {
  let time = new Date().toLocaleTimeString();

  labels.push(time);
  blueData.push(blue);
  redData.push(red);
  greenData.push(green);

  if (labels.length > maxDataPoints) {
    labels.shift();
    blueData.shift();
    redData.shift();
    greenData.shift();
  }

  chart.update();
}
