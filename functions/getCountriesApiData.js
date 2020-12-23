async function getCountreisData() {
    const countries = await fetch("https://corona.lmao.ninja/v3/covid-19/countries", {
        method: "GET",
    }).then(data => data.json());
    return countries;
}
