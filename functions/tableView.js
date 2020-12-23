function tableView(idSelector, name, value, flag, positive = false, population, absoluteUnits = true) {
    const tableItem = document.createElement("div");
    tableItem.classList.add("table-item");
    const countryName = document.createElement("span");
    countryName.classList.add("country-name");
    countryName.innerText = name;
    const flagContainer = document.createElement('img');
    if(name!=="Belarus"){
        flagContainer.src = flag;
    }
    else{
       flagContainer.src = "./images/flag.jpg"
    }
    flagContainer.classList.add("flag");
    const countryValue = document.createElement("span");
    if (lastDayFlag && !absoluteUnits) {
        countryValue.innerText = countPer100000(value,population);
    } else if (lastDayFlag) {
        countryValue.innerText = value;
    } else if (absoluteUnits) {
        countryValue.innerText = value;
    } else {
        const text = countPer100000(value, population);
        if (isFinite(text)) {
            countryValue.innerText = text;
        } else {
            countryValue.innerText = 0;
        }
    }
    if (!positive) {
        countryValue.style.color = "red";
    } else {
        countryValue.style.color = "green";
    }
    tableItem.appendChild(flagContainer);
    tableItem.appendChild(countryName);
    tableItem.appendChild(countryValue);
    idSelector.appendChild(tableItem);
}
