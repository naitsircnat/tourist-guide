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

  map.flyTo([1.3521, 103.8198], 12);

  const searchResultsContainer = document.querySelector("#search-results");
  searchResultsContainer.innerHTML = "";

  let findIcon = L.icon({
    iconUrl: "/icons/find.png",
    iconSize: [25, 25],
    iconAnchor: [22, 94],
    popUpAnchor: [-3, -76],
  });

  let hoverFindIcon = L.icon({
    iconUrl: "/icons/find.png",
    iconSize: [40, 40],
    iconAnchor: [30, 100],
    popUpAnchor: [-3, -76],
  });

  for (let result of results.results) {
    let lat = result.geocodes.main.latitude;
    let lng = result.geocodes.main.longitude;

    // let marker = L.marker([lat, lng]).bindPopup("test");

    // let marker = L.marker([lat, lng]).bindPopup(function () {
    //   const divElement = document.createElement("div");
    //   divElement.innerHTML = `<h3>${result.location.name}</h3>`;
    // });

    let popUpHtml = document.createElement("div");

    popUpHtml.innerHTML = `
      <h5>${result.name}</h5>
      <p>${result.location.address}</p>
    `;

    // let marker = L.marker([lat, lng]).bindPopup(result.name);

    let marker = L.marker([lat, lng], { icon: findIcon }).bindPopup(popUpHtml);

    marker.addEventListener("mouseover", function () {
      this.setIcon(hoverFindIcon);
    });

    marker.addEventListener("mouseout", function () {
      this.setIcon(findIcon);
    });

    marker.addEventListener("click", function () {
      map.flyTo([lat, lng], 16);
      marker.openPopup;
    });

    marker.addTo(resultsLayer);

    const card = document.createElement("div");

    card.innerHTML = `<div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${result.name}</h5>
        <p class="card-text">${result.location.address}</p>
      </div>
    </div>`;

    card.addEventListener("click", function () {
      map.flyTo([lat, lng], 16);
      marker.openPopup();
    });

    searchResultsContainer.appendChild(card);
  }

  resultsLayer.addTo(map);
}
