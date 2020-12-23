function globalView(titleInner, totalInner) {
    const global = document.getElementById("global-cases");
    global.innerHTML = "";
    const title = document.createElement("span");
    const total = document.createElement("span");
    const date = document.createElement("span");
    total.innerText = totalInner;
    if (titleInner !== "recovered" && titleInner !== "todayRecovered") {
        total.style.color = "red";
    } else {
        total.style.color = "green";
    }
    if (titleInner.includes("today")) {
        title.innerText = (titleInner.slice(0, 5) + "  " + titleInner.slice(5)).toUpperCase();
    } else {
        title.innerText = `Global ${titleInner}`.toUpperCase();
    }
    date.innerText = `on  ${today}`;
    date.style.color = "ghostwhite";
    global.appendChild(title);
    global.appendChild(total);
    global.appendChild(date);
}
