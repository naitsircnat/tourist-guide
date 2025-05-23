let map = createMap("map", 1.3521, 103.8198);

let hawkerLayer = L.layerGroup();
let attractionsLayer = L.layerGroup();
let supermarketsLayer = L.layerGroup();
let marketsFoodCentresLayer = L.layerGroup();
let hotelsLayer = L.layerGroup();
let mrtLayer = L.layerGroup();
let bikingCnrLayer = L.layerGroup();
let hikingCnrLayer = L.layerGroup();
let parksNatureReservesLayer = L.layerGroup();

let searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", async function () {
  let query = document.querySelector("#search-box").value;

  let near = document.querySelector("#near-box").value;

  let results;

  if (near.trim() == "") {
    results = await searchGeneral(1.3521, 103.8198, query);
  } else {
    results = await searchNear(query, near);
  }

  console.log(results);

  addResultsToMap(results, map);
});

var icon = L.Icon.extend({
  options: {
    iconSize: [25, 25],
  },
});

var hoverIcon = L.Icon.extend({
  options: {
    iconSize: [40, 40],
  },
});

async function getHawkerLayer() {
  let url = "data/hawker.geojson";
  let response = await axios.get(url);

  var hawkerIcon = new icon({ iconUrl: "./icons/hawker.webp" });
  var hoverHawkerIcon = new hoverIcon({
    iconUrl: "./icons/hawker.webp",
  });

  for (let obj of response.data.features) {
    let lat = obj.geometry.coordinates[1];
    let lng = obj.geometry.coordinates[0];

    let e = document.createElement("div");
    e.innerHTML = obj.properties.Description;
    let tds = e.querySelectorAll("td");

    const name = tds[9].innerHTML;
    const address = tds[13].innerHTML;

    const popUpDescription = document.createElement("div");

    popUpDescription.innerHTML = `<h6>${name}</h6><p>${address}`;

    const marker = L.marker([lat, lng], { icon: hawkerIcon }).bindPopup(
      popUpDescription
    );

    marker.on("mouseover", function () {
      this.setIcon(hoverHawkerIcon);
    });

    marker.on("mouseout", function () {
      this.setIcon(hawkerIcon);
    });

    marker.addEventListener("click", function () {
      map.flyTo([lat, lng], 16);
      marker.openPopup;
    });

    marker.addTo(hawkerLayer);
  }
}

async function getAttractionsLayer() {
  let url = "data/attractions.geojson";
  let response = await axios.get(url);

  var attractionsIcon = new icon({ iconUrl: "./icons/attractions.webp" });
  var hoverAttractionsIcon = new hoverIcon({
    iconUrl: "./icons/attractions.webp",
  });

  for (let obj of response.data.features) {
    let lat = obj.geometry.coordinates[1];
    let lng = obj.geometry.coordinates[0];

    let e = document.createElement("div");
    e.innerHTML = obj.properties.Description;
    let tds = e.querySelectorAll("td");

    const name = tds[4].innerHTML;
    const address = tds[8].innerHTML;
    const description = tds[10].innerHTML;

    const popUpDescription = document.createElement("div");

    popUpDescription.innerHTML = `<h6>${name}</h6><p>${address}</p><i>${description}</i></p>`;

    const marker = L.marker([lat, lng], { icon: attractionsIcon }).bindPopup(
      popUpDescription
    );

    marker.on("mouseover", function () {
      this.setIcon(hoverAttractionsIcon);
    });

    marker.on("mouseout", function () {
      this.setIcon(attractionsIcon);
    });

    marker.addEventListener("click", function () {
      map.flyTo([lat, lng], 16);
      marker.openPopup;
    });

    marker.addTo(attractionsLayer);
  }
}

async function getSupermarketsLayer() {
  let url = "data/supermarkets.geojson";
  let response = await axios.get(url);

  var supermarketIcon = new icon({ iconUrl: "./icons/supermarket.webp" });
  var hoverSupermarketIcon = new hoverIcon({
    iconUrl: "./icons/supermarket.webp",
  });

  for (let obj of response.data.features) {
    let lat = obj.geometry.coordinates[1];
    let lng = obj.geometry.coordinates[0];

    let e = document.createElement("div");
    e.innerHTML = obj.properties.Description;
    let tds = e.querySelectorAll("td");

    const name = tds[0].innerHTML;
    const block = tds[1].innerHTML;
    const street = tds[2].innerHTML;
    // As some locations don't have a unit number
    var unit = tds[3].innerHTML;
    const postalCode = tds[4].innerHTML;

    if (!unit) {
      unit = "-";
    }

    const popUpDescription = document.createElement("div");

    popUpDescription.innerHTML = `<h6>${name}</h6><p>BLK ${block}, ${street}, UNIT ${unit}, (S) ${postalCode}</p>`;

    const marker = L.marker([lat, lng], { icon: supermarketIcon }).bindPopup(
      popUpDescription
    );

    marker.on("mouseover", function () {
      this.setIcon(hoverSupermarketIcon);
    });

    marker.on("mouseout", function () {
      this.setIcon(supermarketIcon);
    });

    marker.addEventListener("click", function () {
      map.flyTo([lat, lng], 16);
      marker.openPopup;
    });

    marker.addTo(supermarketsLayer);
  }
}

async function getMarketsFoodCentresLayer() {
  let url = "data/markets-food-centres.geojson";
  let response = await axios.get(url);

  var marketsFoodCentresIcon = new icon({
    iconUrl: "./icons/markets-food-centres.webp",
  });
  var hoverMarketsFoodCentresIcon = new hoverIcon({
    iconUrl: "./icons/markets-food-centres.webp",
  });

  for (let obj of response.data.features) {
    let lat = obj.geometry.coordinates[1];
    let lng = obj.geometry.coordinates[0];

    let e = document.createElement("div");
    e.innerHTML = obj.properties.Description;
    let tds = e.querySelectorAll("td");

    const name = tds[7].innerHTML;
    const address = tds[6].innerHTML;

    const popUpDescription = document.createElement("div");

    popUpDescription.innerHTML = `<h6>${name}</h6><p>${address}</p>`;

    const marker = L.marker([lat, lng], {
      icon: marketsFoodCentresIcon,
    }).bindPopup(popUpDescription);

    marker.on("mouseover", function () {
      this.setIcon(hoverMarketsFoodCentresIcon);
    });

    marker.on("mouseout", function () {
      this.setIcon(marketsFoodCentresIcon);
    });

    marker.addEventListener("click", function () {
      map.flyTo([lat, lng], 16);
      marker.openPopup;
    });

    marker.addTo(marketsFoodCentresLayer);
  }
}

async function getHotelsLayer() {
  let url = "data/hotels.geojson";
  let response = await axios.get(url);

  var hotelsIcon = new icon({ iconUrl: "./icons/hotel.webp" });
  var hoverHotelsIcon = new hoverIcon({
    iconUrl: "./icons/hotel.webp",
  });

  for (let obj of response.data.features) {
    let lat = obj.geometry.coordinates[1];
    let lng = obj.geometry.coordinates[0];

    let e = document.createElement("div");
    e.innerHTML = obj.properties.Description;
    let tds = e.querySelectorAll("td");

    const name = tds[8].innerHTML;
    const address = tds[5].innerHTML;
    const postalCode = tds[2].innerHTML;

    const popUpDescription = document.createElement("div");

    popUpDescription.innerHTML = `<h6>${name}</h6><p>${address}, (S) ${postalCode}</p>`;

    const marker = L.marker([lat, lng], { icon: hotelsIcon }).bindPopup(
      popUpDescription
    );

    marker.on("mouseover", function () {
      this.setIcon(hoverHotelsIcon);
    });

    marker.on("mouseout", function () {
      this.setIcon(hotelsIcon);
    });

    marker.addEventListener("click", function () {
      map.flyTo([lat, lng], 16);
      marker.openPopup;
    });

    marker.addTo(hotelsLayer);
  }
}

async function getMrtLayer() {
  let url =
    "https://gist.githubusercontent.com/raphodn/aca68c6e5b704d021fe0b0d8a376f4aa/raw/40d3d455da164bf8046a1fc6e51a5dc1ed2a0fa6/singapore-mrt.min.geojson";
  let response = await axios.get(url);

  var mrtIcon = new icon({ iconUrl: "./icons/mrt.webp" });
  var hoverMrtIcon = new hoverIcon({
    iconUrl: "./icons/mrt.webp",
  });

  let layer = L.geoJson(response.data, {
    pointToLayer: function (feature, latlng) {
      let marker = L.marker(latlng, { icon: mrtIcon });

      marker.on("mouseover", function () {
        this.setIcon(hoverMrtIcon);
      });

      marker.on("mouseout", function () {
        this.setIcon(mrtIcon);
      });

      return marker;
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.name);

      layer.on("click", function (e) {
        if (feature.geometry.type === "Point") {
          map.flyTo(e.latlng, 16);
        }
      });
    },
  });

  layer.setStyle({
    color: "grey",
  });

  layer.addTo(mrtLayer);
}

async function getBikingCnrLayer() {
  let url = "data/biking-cnr.geojson";
  let response = await axios.get(url);

  let layer = L.geoJson(response.data, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`<p>Central Nature Reserve Biking Trail</p>`);
    },
  });

  layer.setStyle({
    color: "brown",
  });

  layer.addTo(bikingCnrLayer);
}

async function getHikingCnrLayer() {
  let url = "data/hiking-cnr.geojson";
  let response = await axios.get(url);

  let layer = L.geoJson(response.data, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`<p>Central Nature Reserve Hiking Trail</p>`);
    },
  });

  layer.setStyle({
    color: "orange",
  });

  layer.addTo(hikingCnrLayer);
}

async function getParksNatureReservesLayer() {
  let url = "data/parks-nature-reserves.geojson";
  let response = await axios.get(url);

  let layer = L.geoJson(response.data, {
    onEachFeature: function (feature, layer) {
      let e = document.createElement("div");
      e.innerHTML = feature.properties.Description;
      let tds = e.querySelectorAll("td");

      const name = tds[1].innerHTML;

      const popUpDescription = document.createElement("div");

      popUpDescription.innerHTML = `<p>${name}</p>`;

      layer.bindPopup(popUpDescription);
    },
  });

  layer.setStyle({
    color: "green",
  });

  layer.addTo(parksNatureReservesLayer);
}

const placesLoadingSpinner = document.getElementById("places-loading-spinner");
const placesContainer = document.getElementById("places");

function setParent(el, newParent) {
  newParent.appendChild(el);
}

async function getLayers(map) {
  if (placesLoadingSpinner) {
    placesLoadingSpinner.style.display = "flex";
  }

  try {
    await getHawkerLayer();
    await getAttractionsLayer();
    await getSupermarketsLayer();
    await getMarketsFoodCentresLayer();
    await getHotelsLayer();
    await getMrtLayer();
    await getBikingCnrLayer();
    await getHikingCnrLayer();
    await getParksNatureReservesLayer();

    let overlays = {
      Attractions: attractionsLayer,
      MRT: mrtLayer,
      "Hawker Centres": hawkerLayer,
      Supermarkets: supermarketsLayer,
      "Markets & Food Centres": marketsFoodCentresLayer,
      Hotels: hotelsLayer,
      "Biking (Central Nature Reserve)": bikingCnrLayer,
      "Hiking (Central Nature Reserve)": hikingCnrLayer,
      "Parks & Nature Reserves": parksNatureReservesLayer,
    };

    var control = L.control.layers(null, overlays, { collapsed: false });
    control.addTo(map);

    var htmlObject = control.getContainer();

    if (placesContainer) {
      placesContainer.innerHTML = "";
      setParent(htmlObject, placesContainer);
      attractionsLayer.addTo(map);
      mrtLayer.addTo(map);
    }
  } catch (error) {
    console.error("Error loading map layers:", error);
    if (placesContainer) {
      placesContainer.innerHTML =
        '<p class="text-danger">Failed to load map data. Please try again.</p>';
    }
  } finally {
    if (placesLoadingSpinner) {
      placesLoadingSpinner.style.display = "none";
    }
  }
}

window.addEventListener("DOMContentLoaded", async function () {
  await getLayers(map);
});
