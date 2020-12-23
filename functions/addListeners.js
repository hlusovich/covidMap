document.getElementById("map").addEventListener("click", async (e) => {
    if (e.target.tagName === "IMG") {
        currentCountry = e.target.title.split("-")[0];
        const countryInfo = storage.countries.find(item => item.country === currentCountry);
        showCurrentCountry(countryInfo, countryInfo.countryInfo.flag);
        const chartData = await getDataForCurrentCountry(currentCountry, "cases");
        chartData.push(countryInfo.cases);
        createChart(chartData, "cases " + currentCountry, timeline);
    }
});
tableList.addEventListener("click", async (e) => {
    switch (e.target.classList[0]) {
        case "country-name":
            currentCountry = e.target.innerText;
            const countryInfo = storage.countries.find(item => item.country === currentCountry);
            const chartData = await getDataForCurrentCountry(currentCountry, "cases");
            chartData.push(countryInfo.cases);
            createChart(chartData, "cases " + currentCountry, timeline);
            await showCurrentCountry(countryInfo, countryInfo.countryInfo.flag);
            Array.from(tableNav).map(item => item.classList.remove("table-nav-item_active"));
            break;
        case "current-country-cases":
            createCurrentCountrySectionChart(e, "cases");
            break;
        case "current-country-deaths":
            createCurrentCountrySectionChart(e, "deaths");
            break;
        case "current-country-recovered":
            createCurrentCountrySectionChart(e, "recovered");
            break;
        default:
            createChart(await getDataForCurrentCountry(currentCountry, "cases"), "cases " + currentCountry, timeline);
            break;
    }

});

countrySearch.addEventListener("input", (e) => {
    [...tableList.childNodes].map(item => {
        if (item.childNodes[1].innerText.toLowerCase().startsWith(e.target.value.toLowerCase())) {
            item.classList.remove("hide");
        } else {
            item.classList.add("hide");
        }
    })
});
document.getElementById("table-nav").addEventListener("click", (e) => {
    if (e.target.classList[0] === "table-nav-item") {
        currentSection = e.target.innerText;
        let sectionName = e.target.innerText;
        if (lastDayFlag) {
            sectionName = createTodaySectionName(sectionName);
        }
        table.innerHTML = "";
        Array.from(tableNav).map(item => item.classList.remove("table-nav-item_active"));
        e.target.classList.add("table-nav-item_active");
        markers.map(item => map.removeLayer(item));
        unitsView();
        const totalCount = storage.countries.reduce((acc, curr) => acc + curr[sectionName], 0);
        globalView(sectionName, totalCount);
        chartArray[chartArray.length-1][currentSection] = totalCount;
        if (!absoluteUnits && lastDayFlag) {
            showMarkers(sectionName, sectionName + "per100000");
            legendView(checks[sectionName + "per100000"]);
        } else {
            showMarkers(sectionName);
            legendView(checks[sectionName]);
        }
        createChart(chartArray.map(item => item[currentSection]), currentSection, timeline);
    }

});
const absoluteBtn = document.getElementById("absolute-btn");
const per100000btn = document.getElementById("per100000-btn");
const lastDay = document.getElementById("lastDay");
const lastDayPer1000Btn = document.getElementById("lastDayPer1000Btn");
absoluteBtn.addEventListener("click", () => {
    chooseParams(true, false, currentSection);
    absoluteBtn.classList.add("table-buttons_active");
});

per100000btn.addEventListener("click", () => {
    chooseParams(false, false, currentSection);
    per100000btn.classList.add("table-buttons_active");
});

lastDay.addEventListener("click", () => {
    chooseParams(true, true, createTodaySectionName(currentSection));
    lastDay.classList.add("table-buttons_active");
});
lastDayPer1000Btn.addEventListener("click", async () => {
    chooseParams(false, true, createTodaySectionName(currentSection), createTodaySectionName(currentSection) + "per100000");
    lastDayPer1000Btn.classList.add("table-buttons_active");
});

function createTodaySectionName(name) {
    const result = "today" + name[0].toUpperCase() + name.slice(1);
    return result;
}

function chooseParams(units, today, section, check) {
    absoluteBtn.classList.remove("table-buttons_active");
    per100000btn.classList.remove("table-buttons_active");
    lastDay.classList.remove("table-buttons_active");
    lastDayPer1000Btn.classList.remove("table-buttons_active");
    absoluteUnits = units;
    lastDayFlag = today;
    table.innerHTML = "";
    unitsView();
    showMarkers(section, check);
    legendView(checks[check ? check : section]);
    globalView(section, storage.countries.reduce((acc, curr) => acc + curr[section], 0));

}

fullSIzeTableBtn.addEventListener("click", (e) => showSectionInFullScreen("table", e, chartBlock, mapBlock, capBlock, globalCases, legenda, tableButtons));
fullSIzeChartBtn.addEventListener("click", (e) => showSectionInFullScreen("chart", e, mapBlock, capBlock, globalCases, legenda, tableButtons, tableBlock, tableNavBlock));
fullSIzeMapBtn.addEventListener("click", (e) => showSectionInFullScreen("map", e, chartBlock, capBlock, globalCases, legenda, tableButtons, tableBlock, tableNavBlock));

async function createCurrentCountrySectionChart(e, section) {
    Array.from(tableNav).map(item => item.classList.remove("table-nav-item_active"));
    const currentCoutnryData = [document.querySelector(".current-country-cases"),
        document.querySelector(".current-country-deaths"),
        document.querySelector(".current-country-recovered")];
    currentCoutnryData.map(item => item.classList.remove("current-country_active"));
    e.target.classList.add("current-country_active");
    const countryInfo = storage.countries.find(item => item.country === currentCountry);
    const chartData = await getDataForCurrentCountry(currentCountry, section);
    chartData.push(countryInfo[section]);
    createChart(chartData, section + " " + currentCountry, timeline);
}
