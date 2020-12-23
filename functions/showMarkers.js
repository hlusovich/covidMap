async function showMarkers(type,check) {
    storage.countries.map(item => createMarker(item,map,type,check));
}
