const createMap = () => {
    const mapElement = document.createElement("div");
    mapElement.id = "map";
    const container = document.getElementById("container");
    mapElement.classList.add("map");
    const fullScreenBtn = document.createElement("button");
    fullScreenBtn.classList.add("show-full-size-btn","hide-background");
    fullScreenBtn.id = "full-size-map-btn";
    fullScreenBtn.innerHTML = `<span class="material-icons">crop_free</span>`;
    mapElement.appendChild(fullScreenBtn);
    container.appendChild(mapElement);
    const mapOptions = {
        center: [17.438139, 78.395830],
        zoom: 2.5,
    };
    const map = new L.map('map', mapOptions);
    return map;
};
