const BASE_API_URL = "https://api.foursquare.com/v3";
const API_KEY = "fsq3nVm3/H75FWiXw0E7cysCDXelkbkAfUSN7R9m3jpO8Cc=";

async function search(lat, lng, searchTerms) {
  const response = await axios.get(`${BASE_API_URL}/places/search`, {
    params: {
      ll: lat + "," + lng,
      sort: "DISTANCE",
      radius: 5000,
      limit: 50,
    },
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });

  return response.data;
}

async function getPhotoFromFourSquare(fsqId) {
  const response = await axios.get(`${BASE_API_URL}/places/${fsqId}/photos`, {
    headers: {
      Accept: "application.json",
      Authorization: API_KEY,
    },
  });
  return response.data;
}
