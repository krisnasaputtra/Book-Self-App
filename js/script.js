window.addEventListener("load", () => {
  getDataBook();
});
document.addEventListener("loaded", () => {
  makeBookInRack(dataBook);
});
