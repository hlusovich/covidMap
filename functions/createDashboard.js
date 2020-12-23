async function createDashboard(idSelector) {
    const countries = await getCountreisData();
    storage.countries = countries;
    showMarkers("cases");
    const total = storage.countries.reduce((acc, curr) => acc + curr.cases, 0);
    globalView(currentSection, total);
    const tableList = storage.countries.sort((a, b) => a.cases - b.cases)
        .reverse()
        .map(item => tableView(idSelector, item.country, item.cases, item.countryInfo.flag));
    legendView(checks.cases);
}
