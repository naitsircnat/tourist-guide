let hawkerLayer = L.layerGroup();
let attractionsLayer = L.layerGroup();

async function getHawkerLayer() {
  let url = "data/hawker.geojson";
  let response = await axios.get(url);

  console.log(response.data);

  for (let obj of response.data.features) {
    let lat = obj.geometry.coordinates[1];
    let lng = obj.geometry.coordinates[0];

    L.circle([lat, lng], {
      color: "purple",
      fillColor: "purple",
      fillOpacity: 0.5,
      radius: 700,
    })
      .bindPopup(`<p>${obj.name}</p>`)
      .addTo(hawkerLayer);
  }
}

async function getAttractionsLayer() {
  let url = "data/attractions.geojson";
  let response = await axios.get(url);

  console.log(response.data);

  for (let obj of response.data.features) {
    let lat = obj.geometry.coordinates[1];
    let lng = obj.geometry.coordinates[0];

    L.circle([lat, lng], {
      color: "green",
      fillColor: "green",
      fillOpacity: 0.5,
      radius: 700,
    })
      .bindPopup(`<p>${obj.name}</p>`)
      .addTo(attractionsLayer);
  }
}

async function getLayers(map) {
  await getHawkerLayer();
  await getAttractionsLayer();

  let baseLayers = {
    "Hawker Centres": hawkerLayer,
  };

  let overlays = {
    Attractions: attractionsLayer,
  };

  L.control.layers(baseLayers, overlays).addTo(map);
}

window.addEventListener("DOMContentLoaded", async function () {
  var map = L.map("map").setView([1.3521, 103.8198], 12);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  await getLayers(map);
});

/*
FEATURES FLOW:
- Can select these to view on map
--attractions 
--hotels 
--nature 
--beaches 
--malls 
--transport 
--supermarket 
--hawker centres
--food (too many to display) 

- Can do custom search for places (Foursquare) - e.g. user's hotel or place of interest
*/
