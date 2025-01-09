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

// Places layers

//REFERENCE
async function getHawkerLayer() {
  let url = "data/hawker.geojson";
  let response = await axios.get(url);

  var hawkerIcon = new icon({ iconUrl: "/icons/hawker.png" });
  var hoverHawkerIcon = new hoverIcon({
    iconUrl: "/icons/hawker.png",
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

  var attractionsIcon = new icon({ iconUrl: "/icons/attractions.png" });
  var hoverAttractionsIcon = new hoverIcon({
    iconUrl: "/icons/attractions.png",
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
//REFERENCE

async function getSupermarketsLayer() {
  let url = "data/supermarkets.geojson";
  let response = await axios.get(url);

  var supermarketIcon = new icon({ iconUrl: "/icons/supermarket.png" });
  var hoverSupermarketIcon = new hoverIcon({
    iconUrl: "/icons/supermarket.png",
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
    // Some locations don't have a unit number
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
    iconUrl: "/icons/markets-food-centres.png",
  });
  var hoverMarketsFoodCentresIcon = new hoverIcon({
    iconUrl: "/icons/markets-food-centres.png",
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

  var hotelsIcon = new icon({ iconUrl: "/icons/hotel.png" });
  var hoverHotelsIcon = new hoverIcon({
    iconUrl: "/icons/hotel.png",
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

  var mrtIcon = new icon({ iconUrl: "/icons/mrt.png" });
  var hoverMrtIcon = new hoverIcon({
    iconUrl: "/icons/mrt.png",
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

  console.log(response.data);

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

async function getLayers(map) {
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
    "Hawker Centres": hawkerLayer,
    Attractions: attractionsLayer,
    Supermarkets: supermarketsLayer,
    "Markets & Food Centres": marketsFoodCentresLayer,
    Hotels: hotelsLayer,
    MRT: mrtLayer,
    "Biking (Central Nature Reserve)": bikingCnrLayer,
    "Hiking (Central Nature Reserve)": hikingCnrLayer,
    "Parks & Nature Reserves": parksNatureReservesLayer,
  };

  var control = L.control.layers(null, overlays, { collapsed: false });
  control.addTo(map);

  // Move places selectors to outside of map
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
--hiking x
--cycling x
--parks and nature reserves d
--hotels x 
--mrt (https://gist.githubusercontent.com/raphodn/aca68c6e5b704d021fe0b0d8a376f4aa/raw/40d3d455da164bf8046a1fc6e51a5dc1ed2a0fa6/singapore-mrt.min.geojson) x
--supermarket x
--hawker centres x
--market and food centre x
Do clustering too if needed

- Can do custom search for places (Foursquare) - e.g. user's hotel or place of interest

- can use custom icons for markers: https://leafletjs.com/examples/custom-icons/

Menu items
- history?
- economy?
- geography?
can refer to london map site for other features: https://www.londoncitybreak.com/map

ask chatgpt what else good to include?

Can link to resources in
- https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/?cmp=SEM_STB-MA24-106-SG-SEM_SG_DC_ENG_NA_NA_NONE_BM-Itinerary%26GuidePA-GN_NA_GOOG_SEA_AO_Cross_XTG&gad_source=1&gclid=Cj0KCQiA6Ou5BhCrARIsAPoTxrCAEMNU7z34-DwLeNDcZayyKHOTNd2AHxfNYpAml3Pbs_c0EjvaG7caAnXXEALw_wcB&gclsrc=aw.ds
- klook singapore

Layouts/MoodBoard:
Figma: https://www.figma.com/design/dQn0HsKKoXaMcMvrl5vLbI/SG-tourist-map?node-id=0-1&node-type=canvas&t=wVkyddyzdrAFMNPI-0

Brand Name:
- ExploreSingapore
- ExploreSG
- Discover Singapore
- HelloSingapore

Icons:
Remember to Attribute!

RESOURCES
- requirements: https://docs.google.com/document/d/1iVANh3aaqpX0VSFscP7j-86M1BOkAMGtOuJRmnYynD0/edit?tab=t.0#heading=h.5gcv0ns1dl74
- foursquare search functionality: https://scrawny-dingo-56a.notion.site/Foursquare-Leaflet-5c1bb194ca094dce895e7c02d8ae83d5
- leaflet example tutorials: 
https://leafletjs.com/examples.html
https://docs.maptiler.com/leaflet/examples/

PENDING
- validation for search result addresses and places, some showing undefined. use if()?
- add ghosts text for text inputs etc.
- pop-up images for places
- improve ui for search pop-up;
- nav bar layout for desktop and mobile
- adjust colours for geojson
- refactoring
- include opening hours for each pop-up
- show message if no search results
*/
