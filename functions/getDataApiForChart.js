async function getDataApiForChart(chartArray) {
    const addChartData = async () => await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=180`, {
        method: "GET",
    }).then(data => data.json());
    const checkMonth = (number) => {
        if (number <= 0) {
            number = 12 + number;
        }
        return number
    };
    const chartData = await addChartData();
    console.log(chartData)
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate() - 1;
    const year = date.getFullYear();
    for (let i = 5; i !== -1; i--) {
        const labelDate = `${checkMonth(month - i)}/${day}/${year.toString().slice(2)}`;
        timeline.push(`${day}/${checkMonth(month - i)}/${year}`);
        chartArray.push({
            cases: chartData.cases[labelDate],
            deaths: chartData.deaths[labelDate],
            recovered: chartData.recovered[labelDate],
        });
    }

}
