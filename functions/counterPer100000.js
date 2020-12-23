function countPer100000(item, population) {
    const result = (item / population * 100000).toFixed(1);
    return isFinite(result) ? result : 0;
}
