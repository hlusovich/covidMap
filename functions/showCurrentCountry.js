function showCurrentCountry({country, cases, deaths, recovered, population, todayCases, todayDeaths, todayRecovered}, flag) {
    tableList.innerHTML = "";
    const countryNameCasesFlagBlock = document.createElement("div");
    const countryDeathsRecoveredBlock = document.createElement("div");
    const recoveredDeathsCasesBlockperToday = document.createElement("div");
    const recoveredDeathsCasesBlockpere100000 = document.createElement("div");
    const recoveredDeathsCasesBlockpere100000Today = document.createElement("div");
    const name = document.createElement("div");
    const casesBlock = document.createElement("div");
    casesBlock.classList.add("current-country-cases");
    casesBlock.classList.add("current-country_active");
    const deathsBlock = document.createElement("div");
    deathsBlock.classList.add("current-country-deaths");
    const recoveredBlock = document.createElement("div");
    recoveredBlock.classList.add("current-country-recovered");
    const todayCasesBlock = document.createElement("div");
    const todayRecoveredBlock = document.createElement("div");
    const deathsPer100000Block = document.createElement("div");
    const casesPer100000Block = document.createElement("div");
    const recoveredPer100000Block = document.createElement("div");
    const todayCasesPer100000Block = document.createElement("div");
    const todayPer100000DeathsBlock = document.createElement("div");
    const todayPer100000RecoveredBlock = document.createElement("div");
    const todayDeathsBlock = document.createElement("div");
    const flagBlock = document.createElement("img");
    name.innerText = country;
    name.style.color = "ghostwhite";
    if (country !== "Belarus") {
        flagBlock.src = flag;
    } else {
        flagBlock.src = "./images/flag.jpg"
    }
    flagBlock.classList.add("flag");
    casesBlock.innerText = `all cases : ${cases}`;
    deathsBlock.innerText = `all deaths : ${deaths}`;
    recoveredBlock.innerText = `all recovered : ${recovered}`;
    todayCasesBlock.innerText = `cases today : ${todayCases}`;
    todayDeathsBlock.innerText = `deaths today : ${todayDeaths}`;
    todayRecoveredBlock.innerText = `recovered today : ${todayRecovered}`;

    casesPer100000Block.innerText = `cases/100000 : ${countPer100000(cases, population)}`;
    deathsPer100000Block.innerText = `deaths/100000 : ${countPer100000(deaths, population)}`;
    recoveredPer100000Block.innerText = `recovered/100000 : ${countPer100000(recovered, population)}`;
    todayCasesPer100000Block.innerText = `cases today/100000 : ${countPer100000(todayCases, population)}`;
    todayPer100000DeathsBlock.innerText = `deaths today/100000 : ${countPer100000(todayDeaths, population)}`;
    todayPer100000RecoveredBlock.innerText = `recovered today/100000 : ${countPer100000(todayRecovered, population)}`;
    countryNameCasesFlagBlock.appendChild(name);
    countryNameCasesFlagBlock.appendChild(casesBlock);
    countryDeathsRecoveredBlock.appendChild(deathsBlock);
    countryDeathsRecoveredBlock.appendChild(recoveredBlock);
    recoveredDeathsCasesBlockperToday.appendChild(todayRecoveredBlock);
    recoveredDeathsCasesBlockperToday.appendChild(todayDeathsBlock);
    recoveredDeathsCasesBlockperToday.appendChild(todayCasesBlock);
    recoveredDeathsCasesBlockpere100000.appendChild(recoveredPer100000Block);
    recoveredDeathsCasesBlockpere100000.appendChild(deathsPer100000Block);
    recoveredDeathsCasesBlockpere100000.appendChild(casesPer100000Block);
    recoveredDeathsCasesBlockpere100000Today.appendChild(todayCasesPer100000Block);
    recoveredDeathsCasesBlockpere100000Today.appendChild(todayPer100000RecoveredBlock);
    recoveredDeathsCasesBlockpere100000Today.appendChild(todayPer100000DeathsBlock);
    tableList.appendChild(flagBlock);
    tableList.appendChild(countryNameCasesFlagBlock);
    tableList.appendChild(countryDeathsRecoveredBlock);
    tableList.appendChild(recoveredDeathsCasesBlockperToday);
    tableList.appendChild(recoveredDeathsCasesBlockpere100000);
    tableList.appendChild(recoveredDeathsCasesBlockpere100000Today);

}
