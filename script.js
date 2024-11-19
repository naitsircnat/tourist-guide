let hawkerLayer = L.layerGroup();
let attractionsLayer = L.layerGroup();

/*
how to add layer control to outside of map
https://gis.stackexchange.com/questions/186131/placing-controls-outside-map-container-with-leaflet
*/

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
PROJECT PHASES
- RESEARCH IDEAS TO DECIDE UI LAYOUT
- IMPLEMENT CORE FEATURES
- CREATE UI
- RESPONSIVENESS
- POLISH


FEATURES/LAYOUT?
- map
- selectors of what things to display
--attractions 
--hotels 
--nature 
--beaches 
--malls 
--transport 
--supermarket 
--hawker centres
--food (too many to display)
--airports 

- Can do custom search for places (Foursquare) - e.g. user's hotel or place of interest

- can use custom icons for markers: https://leafletjs.com/examples/custom-icons/

Menu items
- history?
- economy?
- geography?
https://99designs.com.sg/profiles/276825/designs/459509
can refer to london map site for other features


RESOURCES
- requirements: https://docs.google.com/document/d/1iVANh3aaqpX0VSFscP7j-86M1BOkAMGtOuJRmnYynD0/edit?tab=t.0#heading=h.5gcv0ns1dl74
- foursquare search functionality: https://scrawny-dingo-56a.notion.site/Foursquare-Leaflet-5c1bb194ca094dce895e7c02d8ae83d5
- leaflet example tutorials: 
https://leafletjs.com/examples.html
https://docs.maptiler.com/leaflet/examples/



*/
