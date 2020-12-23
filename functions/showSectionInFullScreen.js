function showSectionInFullScreen(section,elem, ...arr) {
    container.classList.toggle(`container-${section}`);
    arr.map(item => item.classList.toggle("hide"));
}
