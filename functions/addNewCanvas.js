function addNewCanvas() {
    document.getElementById("chart").remove();
    const chartBlock = document.getElementById("chart-container");
    const canvas = document.createElement("canvas");
    canvas.id = "chart";
    chartBlock.appendChild(canvas);
}
