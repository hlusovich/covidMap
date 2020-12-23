async function startApp(table, chartArray) {
    const chartData = await getDataApiForChart(chartArray);
    await createDashboard(table);
    chartArray[chartArray.length - 1].cases = storage.countries.reduce((acc, curr) => acc + curr.cases, 0);
    createChart(chartArray.map(item => item.cases), "cases", timeline);
}
