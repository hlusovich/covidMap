function unitsView() {
    if (lastDayFlag) {
        const name = createTodaySectionName(currentSection);
        if (!absoluteUnits) {
            storage.countries.sort((a, b) => countPer100000(a[name], a.population) - countPer100000(b[name], b.population))
                .reverse().map(item => tableView(table, item.country,
                item[name], item.countryInfo.flag, currentSection === "recovered" ? true : false, item.population, absoluteUnits));
        }
        storage.countries.sort((a, b) => a[name] - b[name])
            .reverse().map(item => tableView(table, item.country,
            item[name], item.countryInfo.flag, currentSection === "recovered" ? true : false, item.population, absoluteUnits));
    } else if (absoluteUnits) {
        storage.countries.sort((a, b) => a[currentSection] - b[currentSection])
            .reverse().map(item => tableView(table, item.country,
            item[currentSection], item.countryInfo.flag, currentSection === "recovered" ? true : false, item.population, absoluteUnits));
    } else {
        storage.countries.sort((a, b) => a[currentSection + "PerOneMillion"] - b[currentSection + "PerOneMillion"])
            .reverse().map(item => tableView(table, item.country,
            item[currentSection], item.countryInfo.flag, currentSection === "recovered" ? true : false, item.population, absoluteUnits));
    }
    markers.map(item => map.removeLayer(item));
}
