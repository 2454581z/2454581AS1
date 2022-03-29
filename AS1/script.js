// define access token
      mapboxgl.accessToken = 'pk.eyJ1IjoiMjQ1NDU4MXoiLCJhIjoiY2wxMTc2MmtmMjVuMDNia2JlZXZwbHduOSJ9.5kkvkFYLtUeGnP0iM_fy8Q';

      // create map
      const map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/2454581z/cl11bnybc002d14s410mcy2rp' // map style URL from Mapbox Studio
      });


const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in Edinburgh", // Placeholder text for the search bar
  proximity: {
    longitude: 55.8642,
    latitude: 4.2518
  } // Coordinates of Glasgow center
});

map.addControl(geocoder, "top-left");

map.addControl(new mapboxgl.NavigationControl(), "top-left");

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-left"
);


      // wait for map to load before adjusting it
      map.on('load', () => {
        // make a pointer cursor
        map.getCanvas().style.cursor = 'default';

        // set map bounds to the continental US
        map.fitBounds([
          [-3.08390, 55.84454],
          [-3.43967, 56.01130]
        ]);

        // define layer names
        const layers = [
             "<10",
    "20 ",
    "30 ",
    "40 ",
    "50 ",
    "60 ",
    "70 ",
    "80 ",
    "90 ",
    "100"
        ];
        const colors = [
          '#67001f',
          '#b2182b',
          '#d6604d',
          '#f4a582',
          '#fddbc7',
          '#d1e5f0',
          '#92c5de',
          '#4393c3',
          '#2166ac',
          '#053061'
        ];

        // create legend
 const legend = document.getElementById("legend");

  layers.forEach((layer, i) => {
    const color = colors[i];
    const key = document.createElement("div");
    if (i <= 1 || i >= 8) {
      key.style.color = "white";
    }

    key.className = "legend-key";
    key.style.backgroundColor = color;
    key.innerHTML = `${layer}`;

    legend.appendChild(key);
  });

  map.addSource("hover", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] }
  });

  map.addLayer({
    id: "dz-hover",
    type: "line",
    source: "hover",
    layout: {},
    paint: {
      "line-color": "black",
      "line-width": 4
    }
  });
});

// change info window on hover
map.on("mousemove", (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ["EDI_V3"]
  });

  document.getElementById("pd").innerHTML = dzone.length
    ? `<h3>${dzone[0].properties.DZName}</h3><p>Rank: <strong>${dzone[0].properties.Percentv2}</strong> %</p>`
    : `<p>Hover over a data zone!</p>`;
});