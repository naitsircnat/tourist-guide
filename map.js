function createMap(mapContainerID, lat, lng) {
  var map = L.map(mapContainerID).setView([lat, lng], 12);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  return map;
}

let resultsLayer = L.layerGroup();

function addResultsToMap(results, map) {
  resultsLayer.clearLayers();

  const searchResultsContainer = document.querySelector("#search-results");
  searchResultsContainer.innerHTML = "";

  for (let result of results.results) {
    let lat = result.geocodes.main.latitude;
    let lng = result.geocodes.main.longitude;
    L.marker([lat, lng]).addTo(resultsLayer);

    // card
    const cardHtml = `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${result.name}</h5>
    <p class="card-text">${result.location.address}</p>
  </div>
</div>`;

    searchResultsContainer.innerHTML += cardHtml;

    // const searchResultElement = document.createElement("div");
    // searchResultElement.textContent = result.name;
    // searchResultsContainer.appendChild(searchResultElement);
  }

  resultsLayer.addTo(map);
}
