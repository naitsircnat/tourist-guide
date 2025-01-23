const BASE_API_URL = "https://api.foursquare.com/v3";
const API_KEY = "fsq3nVm3/H75FWiXw0E7cysCDXelkbkAfUSN7R9m3jpO8Cc=";

// with radius encompassing singapore
async function searchGeneral(lat, lng, searchTerms) {
  const response = await axios.get(`${BASE_API_URL}/places/search`, {
    params: {
      query: encodeURI(searchTerms),
      ll: lat + "," + lng,
      sort: "DISTANCE",
      radius: 22500,
      limit: 50,
      fields:
        "name,rating,description,social_media,location,hours,geocodes,fsq_id",
    },
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });
  return response.data;
}

// with near
async function searchNear(query, nearQuery) {
  const response = await axios.get(`${BASE_API_URL}/places/search`, {
    params: {
      near: nearQuery,
      sort: "DISTANCE",
      limit: 50,
    },
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });

  return response.data;
}
