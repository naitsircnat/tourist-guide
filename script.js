let map = createMap("map", 1.3521, 103.8198);

let hawkerLayer = L.layerGroup();
let attractionsLayer = L.layerGroup();

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

async function getLayers(map) {
  await getHawkerLayer();
  await getAttractionsLayer();

  let baseLayers = {
    "Hawker Centres": hawkerLayer,
  };

  let overlays = {
    Attractions: attractionsLayer,
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

Can link to resources in https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/?cmp=SEM_STB-MA24-106-SG-SEM_SG_DC_ENG_NA_NA_NONE_BM-Itinerary%26GuidePA-GN_NA_GOOG_SEA_AO_Cross_XTG&gad_source=1&gclid=Cj0KCQiA6Ou5BhCrARIsAPoTxrCAEMNU7z34-DwLeNDcZayyKHOTNd2AHxfNYpAml3Pbs_c0EjvaG7caAnXXEALw_wcB&gclsrc=aw.ds


RESOURCES
- requirements: https://docs.google.com/document/d/1iVANh3aaqpX0VSFscP7j-86M1BOkAMGtOuJRmnYynD0/edit?tab=t.0#heading=h.5gcv0ns1dl74
- foursquare search functionality: https://scrawny-dingo-56a.notion.site/Foursquare-Leaflet-5c1bb194ca094dce895e7c02d8ae83d5
- leaflet example tutorials: 
https://leafletjs.com/examples.html
https://docs.maptiler.com/leaflet/examples/
*/
