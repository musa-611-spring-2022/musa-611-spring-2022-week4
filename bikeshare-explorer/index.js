const map = L.map('map').setView([39.95, -75.16], 12);
const group = L.layerGroup([]).addTo(map);

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);

let bikeshareStations = bikeshareData.features;

const filterStations = (fstring) => {
  bikeshareStations = bikeshareData.features.filter((station) =>
    station.properties.name.includes(fstring)
  );
};

const updateMapMarkers = () => {
  group.clearLayers();
  bikeshareStations.forEach((station) => {
    const [lng, lat] = station.geometry.coordinates;
    const stationName = station.properties.name;
    const marker = L.marker([lat, lng]);
    marker.bindTooltip(stationName);
    group.addLayer(marker);
  });
};

updateMapMarkers();

const bikeshareFilterInput = document.querySelector('#bikeshare-filter');
bikeshareFilterInput.addEventListener('input', () => {
  const stringToFilterOn = bikeshareFilterInput.value;
  filterStations(stringToFilterOn);
  updateMapMarkers();
})
