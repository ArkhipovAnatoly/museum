import mapboxgl from 'mapbox-gl';

const acsessToken =
  'pk.eyJ1IjoidG9saWsxOTgzIiwiYSI6ImNrdGNzd3ZwazI5Mncydm45NTJ2em5wNnUifQ.UkoadCPMBj33lU_zM91r-g';
function contactsMap() {
  mapboxgl.accessToken = acsessToken;

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [2.3364, 48.86091],
    zoom: 16,
  });

  const nav = new mapboxgl.NavigationControl({
    visualizePitch: true,
  });
  map.addControl(nav, 'top-right');
  new mapboxgl.Marker({ color: '#171717' })
    .setLngLat([2.3364, 48.86091])
    .addTo(map);
  new mapboxgl.Marker({ color: '#757575' })
    .setLngLat([2.3333, 48.8602])
    .addTo(map);
  new mapboxgl.Marker({ color: '#757575' })
    .setLngLat([2.3397, 48.8607])
    .addTo(map);
  new mapboxgl.Marker({ color: '#757575' })
    .setLngLat([2.333, 48.8619])
    .addTo(map);
  new mapboxgl.Marker({ color: '#757575' })
    .setLngLat([2.3365, 48.8625])
    .addTo(map);
}

export default contactsMap;
