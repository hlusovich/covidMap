function createMarker(item, map, type, check = false) {
    const iconOptions = {
        iconSize: [20, 20]
    };
    if (check) {
        checks[check].check(item, type, iconOptions);
    } else {
        checks[type].check(item, type, iconOptions);
    }
    const customIcon = L.icon(iconOptions);
    let title = item.country;
    let subtitle = type;
    let text = item[type];
    if (!absoluteUnits) {
        text = countPer100000(item[type], item.population)
    }
    if (lastDayFlag) {
        subtitle = type.slice(0, 5) + " " + type.slice(5).toLowerCase();
    }
    const markerOptions = {
        title: `${title}- ${subtitle} ${text}`,
        clickable: true,
        draggable: false,
        icon: customIcon,
    };
    const marker = L.marker([item.countryInfo.lat, item.countryInfo.long], markerOptions);
    marker.addTo(map);
    markers.push(marker);
}
