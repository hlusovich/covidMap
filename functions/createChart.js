function createChart(dataSet, title, timeline) {
    addNewCanvas();
    const ctx = document.getElementById('chart').getContext('2d');
    const chartConfig = {
        type: 'line',
        data: {
            labels: timeline,
            datasets: [],
        },
        options: {
            title: {
                display: true,
                text: 'COVID-19 CHART',
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };
    const chart = new Chart(ctx, chartConfig);
    const generateColor = () => {
        if (title.includes("recovered")) {
            return "green"
        }
        return "red";
    };
    const newChart = {
        label: title,
        data: dataSet,
        borderWidth: 2,
        borderColor: generateColor(),
        backgroundColor: generateColor(),
        fill: false,
    };

    chartConfig.data.datasets.pop();
    chart.update();
    chartConfig.data.datasets.push(newChart);
    chart.update();
}
