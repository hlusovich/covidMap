function legendView(item) {
    const redPin = document.querySelector(".red-pin-text");
    const yellowPin = document.querySelector(".yellow-pin-text");
    const greenPin = document.querySelector(".green-pin-text");
    redPin.innerText = item.legendRed();
    yellowPin.innerText = item.legendYellow();
    greenPin.innerText = item.legendGreen();
}
