const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
const map = createMap();
const storage = {};
const table = document.getElementById("table-list");
const tableNav = document.querySelectorAll(".table-nav-item");
const markers = [];
let currentSection = "cases";
let absoluteUnits = true;
let lastDayFlag = false;
const tableList = document.getElementById("table-list");
const countrySearch = document.getElementById("countySearch");
const chartArray = [];
const timeline = [];
let currentCountry = null;
const container = document.getElementById("container");
const chartBlock = document.getElementById("chart-container");
const mapBlock = document.getElementById("map");
const capBlock = document.getElementById("cap");
const globalCases = document.getElementById("global-cases");
const legenda = document.getElementById("legenda");
const tableButtons = document.getElementById("table-buttons");
const tableBlock = document.getElementById("table");
const tableNavBlock = document.getElementById("table-nav");
const fullSIzeTableBtn = document.getElementById("full-size-table-btn");
const fullSIzeChartBtn = document.getElementById("full-size-chart-btn");
const fullSIzeMapBtn = document.getElementById("full-size-map-btn");
const dateNow = new Date();
const today = `${dateNow.getDate() - 1}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`;
const checks = {
    cases: {
        check: function (item, type, iconOptions) {
            const currentValue = absoluteUnits ? item[type] : countPer100000(item[type], item.population);
            if (currentValue > (absoluteUnits ? 1000000 : 1000)) {
                iconOptions.iconUrl = 'images/circle.svg';
            } else if (currentValue > (absoluteUnits ? 100000 : 100)) {
                iconOptions.iconUrl = 'images/yellowCircle.png';
            } else {
                iconOptions.iconUrl = 'images/greenCircle.png';
            }
        },
        legendGreen: () => (absoluteUnits ? "<100000" : "<100"),
        legendRed: () => (absoluteUnits ? ">1000000" : ">1000"),
        legendYellow: () => (absoluteUnits ? "<1000000 and >100000" : "<1000 and >100"),
    },
    deaths: {
        check: function (item, type, iconOptions) {
            const currentValue = absoluteUnits ? item[type] : countPer100000(item[type], item.population);
            if (currentValue > (absoluteUnits ? 50000 : 50)) {
                iconOptions.iconUrl = 'images/circle.svg';
            } else if (currentValue > (absoluteUnits ? 10000 : 10)) {
                iconOptions.iconUrl = 'images/yellowCircle.png';
            } else {
                iconOptions.iconUrl = 'images/greenCircle.png';
            }
        },
        legendGreen: () => (absoluteUnits ? "<10000" : "<10"),
        legendRed: () => (absoluteUnits ? ">50000" : ">50"),
        legendYellow: () => (absoluteUnits ? "<50000 and >10000" : "<50 and >10"),

    },
    recovered: {
        check: function (item, type, iconOptions) {
            const currentValue = absoluteUnits ? item[type] : countPer100000(item[type], item.population);
            if (currentValue > (absoluteUnits ? 1000000 : 1000)) {
                iconOptions.iconUrl = 'images/circle.svg';
            } else if (currentValue > (absoluteUnits ? 100000 : 100)) {
                iconOptions.iconUrl = 'images/yellowCircle.png';
            } else {
                iconOptions.iconUrl = 'images/greenCircle.png';
            }
        },
        legendGreen: () => (absoluteUnits ? "<100000" : "<100"),
        legendRed: () => (absoluteUnits ? ">1000000" : ">1000"),
        legendYellow: () => (absoluteUnits ? "<1000000 and >100000" : "<1000 and >100"),

    },
    todayCases: {
        check: function (item, type, iconOptions) {
            const currentValue = item[type];
            if (currentValue > 1000) {
                iconOptions.iconUrl = 'images/circle.svg';
            } else if (currentValue > 100) {
                iconOptions.iconUrl = 'images/yellowCircle.png';
            } else {
                iconOptions.iconUrl = 'images/greenCircle.png';
            }
        },
        legendGreen: () => "<100",
        legendRed: () => ">1000",
        legendYellow: () => "<1000 and >100",

    },
    todayDeaths: {
        check: function (item, type, iconOptions) {
            const currentValue = item[type];
            if (currentValue > 10) {
                iconOptions.iconUrl = 'images/circle.svg';
            } else if (currentValue > 1) {
                iconOptions.iconUrl = 'images/yellowCircle.png';
            } else {
                iconOptions.iconUrl = 'images/greenCircle.png';
            }
        },
        legendGreen: () => "<1",
        legendRed: () => ">10",
        legendYellow: () => "<10 and >1",

    },
    todayRecovered: {
        check: function (item, type, iconOptions) {
            const currentValue = item[type];
            if (currentValue > 1000) {
                iconOptions.iconUrl = 'images/circle.svg';
            } else if (currentValue > 100) {
                iconOptions.iconUrl = 'images/yellowCircle.png';
            } else {
                iconOptions.iconUrl = 'images/greenCircle.png';
            }
        },
        legendGreen: () => "<100",
        legendRed: () => ">1000",
        legendYellow: () => "<1000 and >100",
    },
    todayRecoveredper100000: {
        check: function (item, type, iconOptions) {
            const currentValue = countPer100000(item[type], item.population);
            if (currentValue > 100) {
                iconOptions.iconUrl = 'images/circle.svg';
            } else if (currentValue > 50) {
                iconOptions.iconUrl = 'images/yellowCircle.png';
            } else {
                iconOptions.iconUrl = 'images/greenCircle.png';
            }
        },
        legendGreen: () => "<50",
        legendRed: () => ">100",
        legendYellow: () => "<100 and >50",
    },
    todayDeathsper100000: {
        check: function (item, type, iconOptions) {
            const currentValue = countPer100000(item[type], item.population);
            if (currentValue > 10) {
                iconOptions.iconUrl = 'images/circle.svg';
            } else if (currentValue > 1) {
                iconOptions.iconUrl = 'images/yellowCircle.png';
            } else {
                iconOptions.iconUrl = 'images/greenCircle.png';
            }
        },
        legendGreen: () => "<1",
        legendRed: () => ">10",
        legendYellow: () => "<10 and >1",
    },
    todayCasesper100000: {
        check: function (item, type, iconOptions) {
            const currentValue = countPer100000(item[type], item.population);
            if (currentValue > 20) {
                iconOptions.iconUrl = 'images/circle.svg';
            } else if (currentValue > 5) {
                iconOptions.iconUrl = 'images/yellowCircle.png';
            } else {
                iconOptions.iconUrl = 'images/greenCircle.png';
            }
        },
        legendGreen: () => "<5",
        legendRed: () => ">20",
        legendYellow: () => "<20 and >5",
    },

};
map.addLayer(layer);
startApp(table, chartArray);



