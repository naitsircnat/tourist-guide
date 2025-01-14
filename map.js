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

let getPhotoFromFoursquare = async (fsqId) => {
  const response = await axios.get(`${BASE_API_URL}/places/${fsqId}/photos`, {
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });
  console.log(response.data);
  return response.data;
};

function addResultsToMap(results, map) {
  resultsLayer.clearLayers();

  map.flyTo([1.3521, 103.8198], 12);

  const searchResultsContainer = document.querySelector("#search-results");
  searchResultsContainer.innerHTML = "";

  var findIcon = new icon({ iconUrl: "/icons/find.png" });
  var hoverFindIcon = new hoverIcon({
    iconUrl: "/icons/find.png",
  });

  for (let result of results.results) {
    let lat = result.geocodes.main.latitude;
    let lng = result.geocodes.main.longitude;

    let marker = L.marker([lat, lng], { icon: findIcon }).bindPopup(
      function () {
        let popUpHtml = document.createElement("div");

        popUpHtml.innerHTML = `
        <h6>${result.name}</h6>
        <img src="#" style="display:none"/>
        <p><b>About</b>: ${
          result.description == null ? "-" : result.description
        }</p>
        <p><b>Address</b>: ${result.location.formatted_address}</p>
        <p><b>Opening Hours</b>: ${
          result.hours.display == null ? "-" : result.hours.display
        }</p>
      `;
        async function getPicture() {
          const photos = await getPhotoFromFoursquare(result.fsq_id);
          if (photos && photos.length > 0) {
            const firstPhoto = photos[0];
            const photoUrl = firstPhoto.prefix + "280x160" + firstPhoto.suffix;
            popUpHtml.querySelector("img").src = photoUrl;
            popUpHtml.querySelector("img").style.display = "block";
          }
        }

        getPicture();

        return popUpHtml;
      },
      { minWidth: 300 }
    );

    marker.addEventListener("mouseover", function () {
      this.setIcon(hoverFindIcon);
    });

    marker.addEventListener("mouseout", function () {
      this.setIcon(findIcon);
    });

    marker.addEventListener("click", function () {
      // map.flyTo([lat, lng], 16);

      var targetLatLng = [lat, lng];

      var offsetX = 0;
      var offsetY = -15;
      var targetPoint = map.latLngToContainerPoint(targetLatLng);

      var adjustedPoint = L.point(
        targetPoint.x + offsetX,
        targetPoint.y + offsetY
      );

      var adjustedLatLng = map.containerPointToLatLng(adjustedPoint);

      map.flyTo(adjustedLatLng, 16);

      marker.openPopup();
    });

    marker.addTo(resultsLayer);

    const card = document.createElement("div");

    card.innerHTML = `<div class="card mb-2" style="width: 280px">
      <div class="card-body">
        <h6 class="card-title">${result.name}</h6>
        <p class="card-text">${
          result.location.address == null ? "-" : result.location.address
        }</p>
      </div>
    </div>`;

    card.addEventListener("click", function () {
      // map.flyTo([lat, lng], 16);

      var targetLatLng = [lat, lng];

      var offsetX = 0;
      var offsetY = -15;

      var targetPoint = map.latLngToContainerPoint(targetLatLng);

      var adjustedPoint = L.point(
        targetPoint.x + offsetX,
        targetPoint.y + offsetY
      );

      var adjustedLatLng = map.containerPointToLatLng(adjustedPoint);

      map.flyTo(adjustedLatLng, 16);
      marker.openPopup();
    });

    searchResultsContainer.appendChild(card);
  }

  resultsLayer.addTo(map);
}
