let map = createMap("map", 1.3521, 103.8198);

let hawkerLayer = L.layerGroup();
let attractionsLayer = L.layerGroup();
let supermarketsLayer = L.layerGroup();
let marketsFoodCentresLayer = L.layerGroup();

// Search
let searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", async function () {
  let query = document.querySelector("#search-box").value;
  let results = await search(1.3521, 103.8198, query);
  console.log(query);
  console.log(results);

  addResultsToMap(results, map);
});

// Places layers
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
      radius: 300,
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
      radius: 300,
    })
      .bindPopup(`<p>${obj.name}</p>`)
      .addTo(attractionsLayer);
  }
}

async function getSupermarketsLayer() {
  let url = "data/supermarkets.geojson";
  let response = await axios.get(url);

  console.log(response.data);

  for (let obj of response.data.features) {
    let lat = obj.geometry.coordinates[1];
    let lng = obj.geometry.coordinates[0];

    L.circle([lat, lng], {
      color: "grey",
      fillColor: "grey",
      fillOpacity: 0.5,
      radius: 300,
    })
      .bindPopup(`<p>${obj.name}</p>`)
      .addTo(supermarketsLayer);
  }
}

async function getLayers(map) {
  await getHawkerLayer();
  await getAttractionsLayer();
  await getSupermarketsLayer();

  let baseLayers = {
    "Hawker Centres": hawkerLayer,
  };

  let overlays = {
    Attractions: attractionsLayer,
    Supermarkets: supermarketsLayer,
  };

  var control = L.control.layers(baseLayers, overlays, { collapsed: false });
  control.addTo(map);

  var htmlObject = control.getContainer();

  var a = document.getElementById("places");

  function setParent(el, newParent) {
    newParent.appendChild(el);
  }

  setParent(htmlObject, a);
}

// Add places layers
window.addEventListener("DOMContentLoaded", async function () {
  await getLayers(map);
});

/*
PROJECT PHASES
- RESEARCH IDEAS TO DECIDE UI LAYOUT
- IMPLEMENT CORE FEATURES
- ADD SEC FEATURES
- CRAETE UI
- RESPONSIVENESS
- POLISH & REFACTORING


FEATURES/LAYOUT?
- map
- selectors of what things to display
--tourist attractions x
--hiking d
--cycling d
--parks and nature reserves d
--hotels d 
--mrt (https://gist.githubusercontent.com/raphodn/aca68c6e5b704d021fe0b0d8a376f4aa/raw/40d3d455da164bf8046a1fc6e51a5dc1ed2a0fa6/singapore-mrt.min.geojson) d
--supermarket x
--hawker centres x
--market and food centre d

- Can do custom search for places (Foursquare) - e.g. user's hotel or place of interest

- can use custom icons for markers: https://leafletjs.com/examples/custom-icons/

Menu items
- history?
- economy?
- geography?
can refer to london map site for other features: https://www.londoncitybreak.com/map


Can link to resources in https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/?cmp=SEM_STB-MA24-106-SG-SEM_SG_DC_ENG_NA_NA_NONE_BM-Itinerary%26GuidePA-GN_NA_GOOG_SEA_AO_Cross_XTG&gad_source=1&gclid=Cj0KCQiA6Ou5BhCrARIsAPoTxrCAEMNU7z34-DwLeNDcZayyKHOTNd2AHxfNYpAml3Pbs_c0EjvaG7caAnXXEALw_wcB&gclsrc=aw.ds

Figma: https://www.figma.com/design/dQn0HsKKoXaMcMvrl5vLbI/SG-tourist-map?node-id=0-1&node-type=canvas&t=wVkyddyzdrAFMNPI-0


RESOURCES
- requirements: https://docs.google.com/document/d/1iVANh3aaqpX0VSFscP7j-86M1BOkAMGtOuJRmnYynD0/edit?tab=t.0#heading=h.5gcv0ns1dl74
- foursquare search functionality: https://scrawny-dingo-56a.notion.site/Foursquare-Leaflet-5c1bb194ca094dce895e7c02d8ae83d5
- leaflet example tutorials: 
https://leafletjs.com/examples.html
https://docs.maptiler.com/leaflet/examples/
*/
