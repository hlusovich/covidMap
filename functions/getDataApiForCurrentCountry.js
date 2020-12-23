async function getDataForCurrentCountry(country, section) {
    const countryData = await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=300`, {
        method: "GET",
    }).then(data => data.json());
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate() - 1;
    let year = date.getFullYear();
    const checkMonth = (number) => {
        if (+number === 0) {
            number = 12;
            year--;
        }
        return number
    };
    const checkDay = (number) => {
        if (number < 0) {
            number = 28;
        }
        if (number < 10) {
            number = "0" + number;
        }
        return number
    };
    return [countryData.timeline[section][`${checkMonth(month - 5)}/${checkDay(day)}/${year.toString().slice(2)}`],
        countryData.timeline[section][`${checkMonth(month - 4)}/${checkDay(day)}/${year.toString().slice(2)}`],
        countryData.timeline[section][`${checkMonth(month - 3)}/${checkDay(day)}/${year.toString().slice(2)}`],
        countryData.timeline[section][`${checkMonth(month - 2)}/${checkDay(day)}/${year.toString().slice(2)}`],
        countryData.timeline[section][`${checkMonth(month - 1)}/${checkDay(day)}/${year.toString().slice(2)}`],
    ];

}
