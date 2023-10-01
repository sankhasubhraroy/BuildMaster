async function getCoordinates(city) {
  const response = await fetch(`https://geocode.maps.co/search?q=${city}`);
  const data = await response.json();
  if (data.length === 0) throw new Error("Invalid address");
  return {
    longitude: data[0].lon,
    latitude: data[0].lat,
  };
}

module.exports = getCoordinates;
