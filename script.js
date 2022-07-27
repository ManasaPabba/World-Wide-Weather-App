let lat = '17.40658473380454', lng = '78.51869310622222';
let key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZmEuZm9yZWNhLmNvbVwvYXV0aG9yaXplXC90b2tlbiIsImlhdCI6MTYzNTUwNzMzNSwiZXhwIjoxNjM2MTEyMTM1LCJuYmYiOjE2MzU1MDczMzUsImp0aSI6ImE2NWRiNzQ5OGQ0ZWVkZTIiLCJzdWIiOiJtYW5hc2FwYWJiYTYiLCJmbXQiOiJYRGNPaGpDNDArQUxqbFlUdGpiT2lBPT0ifQ.IWno92KzH48Ac8F_FYGRvfYrpUihe99yuDs1FS42bbI";
const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const moonPhases = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Third quarter", "Waning Crescent"];
const uvIndex = ["Low", "Low", "Low", "Moderate", "Moderate", "Moderate", "High", "High", "Very high", "Very high", "Very high", "Extreme"];
const uvColor = ["#2eea2e", "#2eea2e", "#2eea2e", "#ffff29", "#ffff29", "#ffff29", "#ffa929", "#ffa929", "#ff1a1a", "#ff1a1a", "#ff1a1a", "#db57db"];
const AQI = ["#2eea2e", "#ffff29", "#ffa929", "#ff1a1a", "#db57db"];
const AQI1 = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
let foreDaily, foreHourly;//arrays returned from json
let address;
let ddHtml = '';//dailydata to be put in html
let hdHtml = [];//hourlydata to be put in html
let cHtml = '';
let addHtml = '';
let dayDetHtml = [];
let cM, ampm, i, j = 0, k = 0, CF = "C", CF1 = "F", hours, split, once = 0, hours1, ampm1, aqi, current;
let dch = 0//to know which daily card is highlighted;
let flying = false, click = true;
let scWidth, scHeight;
let favloc = {};
let favHtml = '';
const imgSrc = { "01d": "d000", "01n": "n000", "02d": "d200", "02n": "n200", "03d": "d300", "03n": "n300", "04d": "d400", "04n": "d400", "09d": "d420", "09n": "n420", "10d": "d220", "10n": "n220", "11d": "d440", "11n": "n440", "13d": "d422", "13n": "n422", "50d": "d600", "50n": "n600" };
const imgSrc1 = {
  "d000": "https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
  "d200": "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
  "d300": "https://images.unsplash.com/photo-1503494201477-5e04f651cfe5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
  "d400": "https://images.unsplash.com/photo-1500740516770-92bd004b996e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
  "d420": "https://images.unsplash.com/photo-1556485689-33e55ab56127?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
  "n420": "https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
  "d600": "https://images.unsplash.com/photo-1533708985023-a9726305e9c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
  "n000": "https://images.unsplash.com/photo-1541280910158-c4e14f9c94a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
  "n200": "https://images.unsplash.com/photo-1604083142449-79b1babd12d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
  "n300": "https://images.unsplash.com/photo-1616843412755-356b9f8b30b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
  "n600": "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
  "n220": "https://images.unsplash.com/photo-1498847559558-1e4b1a7f7a2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
  "d220": "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
  "d440": "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
  "n440": "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
  "d422": "https://images.unsplash.com/photo-1505139229755-18651479b8be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
  "n422": "https://images.unsplash.com/photo-1606230144598-ed5d503a4c43?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1"
}
scHeight = screen.height;
scWidth = screen.width;
var r = document.querySelector(':root');
r.style.setProperty('--sh', `${scHeight}px`);
r.style.setProperty('--sw', `${scWidth}px`);
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
var mapN = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [78.51869310622222, 17.40658473380454],
  zoom: 16
});
mapN.touchZoomRotate.disableRotation();
mapN.on('style.load', function () {
  mapN.on('click', async function (e) {
    if (click) {
      r.style.setProperty('--z', 20);
      r.style.setProperty('--animPlaySt', 'running');
      click = false;
      lat = e.lngLat.lat; lng = e.lngLat.lng;
      lng = lng > 180 || lng < -180 ? 360 - Math.abs(lng) : lng;
      await markData(15);
    }
  });
});
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
});
geocoder.addTo('#geocoder');
geocoder.on('result', (e) => {
  let coord = e.result;
  lat = coord.geometry.coordinates[1];
  lng = coord.geometry.coordinates[0];
  markData(15);
});
async function markData(i) {
  new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(mapN);
  await Promise.all([getData(), fly(i)]).then(function () { r.style.setProperty('--z', -7); r.style.setProperty('--animPlaySt', 'paused'); click = true; });
}
function fly(i) {
  mapN.flyTo({
    center: [
      lng, lat
    ],
    zoom: i,
    essential: true
  });
  flying = true;
}
mapN.on('moveend', function (e) {
  if (flying) {
    document.getElementById("scrolling").click();
    closeNav();
    flying = false;
  }
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) { lat = position.coords.latitude; lng = position.coords.longitude; markData(16); }, function () { new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapN); });
  }
}
getLocation();

async function windyMap() {
  window.W = { version: "23.1.1", assets: "23.1.1.lib.baaa", sha: "a2400baaa", target: "lib", build: "2020-01-27, 09:01" };
  /*! Copyright (c) Windyty SE, 2019 all rights reserved */
  var printError = function (t) { var e = function () { document.getElementById("windy").innerHTML = '\n\t\t\t<p style="text-align: center; margin-top: 200px;">\n\t\t\t\t' + t + '<br /><br />\n\t\t\t\tvisit <a style="color: inherit" href="https://www.windy.com/" target="_blank">www.windy.com</a> or <a style="color: inherit" href="https://api.windy.com/" target="_blank">api.windy.com</a>\n\t\t\t</p>' }; console.error(t), "complete" === document.readyState ? e() : window.addEventListener("load", e) }, message = function (t) { document.querySelector("#windy").insertAdjacentHTML("beforeend", '<section style="position: absolute;\n\t\t\t\t\tleft: 50%;\n\t\t\t\t\tbottom: 20%;\n\t\t\t\t\topacity: .6;\n\t\t\t\t\tpointer-events: none;\n\t\t\t\t\tline-height: 1.6;\n\t\t\t\t\ttext-align: center;\n\t\t\t\t\ttransform: translate(-50%,-50%);\n\t\t\t\t\tfont-size: 16px;">' + t + "</section>") }; !function () { if (DEBUG = !1, window.W && window.W.version) if (window.L) { var t = "https://www.windy.com/v/" + W.assets; window.windyInit = function (t, i) { var o = t.key; var r = new XMLHttpRequest; r.open("POST", "https://api.windy.com/api/map-forecast/v2/auth", !0), r.setRequestHeader("Content-type", "application/json; charset=utf-8"), r.onload = function () { var a; try { a = JSON.parse(r.responseText) } catch (t) { a = {} } var s = a.auth, d = a.paid, c = a.domains, p = a.apiUser, l = a.id, u = a.name, w = a.type, y = a.exceeded; 4 !== r.readyState || parseInt(r.status) >= 300 ? printError("Not authorized to Windy API.") : e(o, c) ? (window.W.windyBoot = { options: t, cb: i, auth: s, id: l, name: u, type: w, paid: d, apiUser: p, exceeded: y }, n(s)) : printError("Windy API used on unauthorized domain.") }, r.send(JSON.stringify({ key: o })) }; var e = function (t, e) { if (!e || !/\S+/.test(e)) return !0; var n = document.location.hostname; var i = e.split(",").map(function (t) { return new RegExp(t.trim().toLowerCase()) }).filter(function (t) { return t.test(n) }); return i && i.length > 0 }, n = function () { var e, n; e = "lib.css", (n = document.createElement("link")).rel = "stylesheet", n.href = t + "/" + e, document.head.appendChild(n), function (e, n) { var i = document.createElement("script"); i.type = "text/javascript", document.head.appendChild(i), i.async = !0, n && (i.onload = n), i.onerror = function () { return printError("Failed to load Windy API.") }, i.src = t + "/" + e }("lib.js", function () { var t = window.W.windyBoot.name; (!t || t.length < 5) && message("Missing name of your app. Please go to your API key generation page and fill name of your app.") }) } } else printError("Leaflet library is missing"); else printError("Missing global object W. Have you loaded libManifest?") }();
  const options = {
    key: 'ovLPUhA7UmZszcS8vktUeWlQn8OFrAVy',
    verbose: true,
    lat: 50.4,
    lon: 14.3,
    zoom: 1,
  };
  await windyInit(options, windyAPI => {
    var myobj = document.getElementById("logo-wrapper");
    myobj.remove();

    const { mapW } = windyAPI;
  });
}
windyMap();
function mapButton1() {
  r.style.setProperty('--windyZ', -4);
  document.getElementById("mapButton1").style.background = "white";
  document.getElementById("mapButton2").style.background = "transparent";
}
function mapButton2() {
  r.style.setProperty('--windyZ', 4);
  document.getElementById("mapButton2").style.background = "white";
  document.getElementById("mapButton1").style.background = "transparent";
}

function favoritesUpdate() {
  favHtml = '';
  for (var key in favloc) {
    favHtml = favHtml + `<div id="favoritesCard">
    <div id="addrfav">${favloc[key].adr}</div>
    <div id="favoritesCard1">
      <button onclick="selfav(this.id)" id="${key}">select</button>
      <button onclick="delfav(this.id)" id="${key}">delete</button>
    </div>
  </div>`
  }
  document.getElementById("favorites").innerHTML = favHtml;
}

async function fetchDB() {
  let response = await fetch('https://weather-app-72411-default-rtdb.asia-southeast1.firebasedatabase.app/location.json');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  let data = await response.json();
  if (data != null) {
    favloc = data;
  }
  favoritesUpdate();
}
fetchDB()
  .catch(e => {
    console.log('There has been a problem with your fetch operation: ' + e.message);
  });

function favButton1() {
  var k = `${lat}${lng}`.split(".").toString();
  if (favloc[k]) { return; }
  favloc[k] = {
    lat1: lat,
    lng1: lng,
    adr: address
  }
  fetch("https://weather-app-72411-default-rtdb.asia-southeast1.firebasedatabase.app/location.json", {
    body: JSON.stringify(favloc),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "PUT"
  })
  favoritesUpdate();
}

function favButton2() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function selfav(bid) {
  lat = favloc[bid].lat1;
  lng = favloc[bid].lng1;
  closeNav();
  markData(15);
}
function delfav(bid) {
  delete favloc[bid];
  favoritesUpdate();
  fetch(`https://weather-app-72411-default-rtdb.asia-southeast1.firebasedatabase.app/location/${bid}.json`, {
    method: 'DELETE',
  })
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
}

async function getData() {
  await Promise.all([fetch(`https://pfa.foreca.com/api/v1/forecast/daily/${lng},${lat}&windunit=KMH&dataset=full`, {
    headers: {
      Authorization: `Bearer ${key}`
    }
  }), fetch(`https://pfa.foreca.com/api/v1/forecast/hourly/${lng},${lat}&periods=168&windunit=KMH&dataset=full`, {
    headers: {
      Authorization: `Bearer ${key}`
    }
  }), fetch(`https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${lat}%2C${lng}&language=en`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "a6e0ed1f50mshbf993866b7aa03fp133979jsn73f03e1ecae3",
      "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com"
    }
  }), fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=ced0db4c7323f0a4282b47e1bdf004a7`),
  fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lng}&appid=ced0db4c7323f0a4282b47e1bdf004a7`)]).then(function (responses) {
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    foreDaily = data[0].forecast;
    foreHourly = data[1].forecast;
    current = data[4];
    let i;
    address = "no address";
    for (i = 1; i < 5; i++) { if (data[2].results[i].address != undefined) break; }
    if (i != 5) { address = data[2].results[i].address; }
    aqi = data[3].list[0].main.aqi - 1;

  }).catch(function (error) {
  });

  store();
}

function store() {
  j = 0;
  hours = new Date().getHours(); cM = new Date().getMinutes();
  while (hours != new Date(foreHourly[j].time).getHours()) { j++; }
  split = foreHourly[j].time.split("T");
  k = parseInt(split[1].split(":")[0]);
  if (k != 23) j++;
  k = j;
  ampm = getAmpm(hours);
  hours = getHours(hours);
  if (cM < 10) cM = `0${cM}`;
  dayDetHtml = [];
  once = 0;
  dch = 0;
  store1();
}

function store1() {
  j = k;
  ddHtml = '';
  hdHtml = [];
  cHtml = '';
  let convertTemp1 = 0, convertTemp2 = 0;
  if (CF == "C") {
    convertTemp1 = Math.round(current.main.temp);
    convertTemp2 = Math.round(current.main.feels_like);
  }
  else {
    convertTemp1 = Math.round((current.main.temp * 1.8) + 32);
    convertTemp2 = Math.round((current.main.feels_like * 1.8) + 32);
  }
  cHtml = `<div class="currentCard animation" >
        <div class="cTempFlex">
          <img src="Images/${imgSrc[current.weather[0].icon]}.png" class="cTempFlex-1">
          <div class="cTempFlex-2">${convertTemp1}&deg;</div>
          <div class="cTempFlex-3">
            <div class="cTempFlex-31">${CF}</div>
            <div class="cTempFlex-32"><button class="tempButton" onclick="changeUnit()">${CF1}</button></div>
          </div>
        </div>
        <div class="desc">${current.weather[0].description}</div>
        <div class="updated">updated as of ${hours}:${cM} ${ampm}</div>
        <div class="cDetailsFlex">
          <div class="cDetailsFlex-1">
            <div class="cDetailsFlex-11">Feels like  <span>${convertTemp2}&deg;</span></div>
            <div class="cDetailsFlex-11">Wind  <span>${Math.round(current.wind.speed * 3.6)}km/h</span></div>
            <div class="cDetailsFlex-11">AQI <span class="tooltip"><img src="Images/Info.svg"  style="width:13px;height:13px"><span class="tooltiptext">Air Quality Index</span></span> 
              <svg width="8" height="8">
                <circle cx="4" cy="4" r="3" stroke="none"  fill=${AQI[aqi]} />
              <svg>
              <span>
                ${AQI1[aqi]} 
              </span>
            </div>
          </div>
          <div class="cDetailsFlex-1">
            <div class="cDetailsFlex-11">Visibility <span>${Math.round(current.visibility / 1000)}km</span> </div>
            <div class="cDetailsFlex-11">Humidity  <span>${current.main.humidity}%</span></div>
            
          </div>
        </div>
      </div>`

  addHtml = `<div class="subHead" >Address</div>
                <div class="address">${address}</div>`;

  for (i = 0; i < foreDaily.length; i++) {
    let iso = new Date(foreDaily[i].date);
    if (CF == "C") {
      convertTemp1 = foreDaily[i].maxTemp;
      convertTemp2 = foreDaily[i].minTemp;
    }
    else {
      convertTemp1 = Math.round((foreDaily[i].maxTemp * 1.8) + 32);
      convertTemp2 = Math.round((foreDaily[i].minTemp * 1.8) + 32);
    }
    if (foreDaily[i].symbolPhrase == "thunderstorms") { foreDaily[i].symbolPhrase = "T-Storms"; }
    if (foreDaily[i].symbolPhrase == "wet snow showers" || foreDaily[i].symbolPhrase == "light wet snow") { foreDaily[i].symbolPhrase = "wet snow"; }
    ddHtml += `<button class="dailyCard" id="bc${i}" onclick="hDetails(${i})">
            <div class="temp">${dayName[iso.getDay()]} ${iso.getDate()}</div>
            <img src="Images/${foreDaily[i].symbol}.png">
            <div class="deg"><div>${convertTemp1}&deg;</div><span>${convertTemp2}&deg;</span></div>
            <div class="desc">${foreDaily[i].symbolPhrase}</div>
            </button>`;
    hdHtml.push('');
    let isoDate = iso.getDate();
    for (; j < foreHourly.length; j++) {
      split = foreHourly[j].time.split("T");
      let isoH = new Date(split[0]);
      if (isoH.getDate() == isoDate) {

        hours1 = parseInt(split[1].split(":")[0]);
        getHours();
        if (CF == "C") {
          convertTemp1 = foreHourly[j].temperature;
        }
        else {
          convertTemp1 = Math.round((foreHourly[j].temperature * 1.8) + 32);
        }
        if (foreHourly[j].symbolPhrase == "thunderstorms") { foreHourly[j].symbolPhrase = "T-Storms" }
        if (foreHourly[j].symbolPhrase == "wet snow showers" || foreHourly[j].symbolPhrase == "light wet snow") { foreHourly[j].symbolPhrase = "wet snow"; }
        hdHtml[i] += `<div class="hourlyCard" >
                              <img src="Images/${foreHourly[j].symbol}.png">
                                  <div class="deg">
                                    <span>${convertTemp1}&deg;</span>
                                  </div>
                                  <div class="desc">${foreHourly[j].symbolPhrase}</div>
                                  <div class="rainWind">
                                    <img src="Images/waterDrop.svg">
                                    <div  style="display:inline-block;width:8px"></div>${foreHourly[j].precipProb}%
                                    <br>
                                    <svg width="13" height="13" viewBox="0 0 10 14" style="transform:rotate(${foreHourly[j].windDir}deg);opacity:0.9">
                                      <path d="M5 0L9.66895 14L5 9.33105L0.331055 14L5 0Z" fill="white"></path>
                                    </svg>
                                    <div style="display:inline-block;width:8px"></div>${foreHourly[j].windSpeed} km/h
                                  </div>
                                  <hr class="line" style="width:80px;margin-top:15px;text-align:left;margin-left:0;overflow: hidden;">
                                  <div class="hourCTime">${getHours(hours1)} ${getAmpm(hours1).toLowerCase()}</div>
                                </div>`;
      }
      else { break; }
    }
    if (once == 0) {
      dayDetHtml.push(`<div class="FlexDayDet">
                          <div class="FlexDayDet-1">
                            <hr class="line" style="margin-top:15px;overflow: hidden;width:100%">
                            <div class="FlexDayDet-11">
                              <div class="FlexDayDet-111">Sunrise</div>
                              <div class="FlexDayDet-112">
                                <img src="Images/sunrise.svg">
                                <div >${dataAvail(foreDaily[i].sunrise)}</div>
                              </div>
                            </div>
                            <div class="FlexDayDet-12 FlexDayDet-11">
                              <div class="FlexDayDet-111">Sunset</div>
                              <div class="FlexDayDet-112">
                                <img src="Images/sunset.svg">
                                <div >${dataAvail(foreDaily[i].sunset)}</div>
                              </div>
                            </div>
                          </div>
                          <div class="FlexDayDet-1 FlexDayDet-2">
                            <hr class="line" style="margin-top:15px;overflow: hidden;">
                            <div class="FlexDayDet-11">
                              <div class="FlexDayDet-111">Moonrise</div>
                              <div class="FlexDayDet-112">
                                <img src="Images/moonrise.svg">
                                <div >${dataAvail(foreDaily[i].moonrise)}</div>
                              </div>
                            </div>
                            <div class="FlexDayDet-12 FlexDayDet-11">
                              <div class="FlexDayDet-111">Moonset</div>
                              <div class="FlexDayDet-112">
                                <img src="Images/moonset.svg">
                                <div >${dataAvail(foreDaily[i].moonset)}</div>
                              </div>
                            </div>
                            <div class="FlexDayDet-23 FlexDayDet-11">
                              <div class="FlexDayDet-111">Moon Phase</div>
                              <img src="Images/phase${Math.floor(foreDaily[i].moonPhase / 45 == 8 ? 7 : foreDaily[i].moonPhase / 45)}.png">
                              <div id="moonPhase">${moonPhases[Math.floor(foreDaily[i].moonPhase / 45 == 8 ? 7 : foreDaily[i].moonPhase / 45)]}</div>
                            </div>
                          </div>
                          <div class="FlexDayDet-1 FlexDayDet-3">
                            <hr class="line" style="margin-top:15px;overflow: hidden;">
                            <div class="FlexDayDet-11 FlexDayDet-31">
                              <div>
                                <div class="FlexDayDet-111">UV Index</div>
                                <div>
                                  <svg>
                                    <circle cx="50" cy="55" r="45" stroke="rgba(255,255,255,0.3)" stroke-width="6.5" fill="none" />
                                    <svg>
                                      <path d="${describeArc((foreDaily[i].uvIndex > 16 ? 16 : foreDaily[i].uvIndex) * 22.5)}" fill="none" stroke=${uvColor[foreDaily[i].uvIndex > 11 ? 11 : foreDaily[i].uvIndex]} stroke-width="6.5" />
                                    </svg>
                                    <text  x="50" y="45" dominant-baseline="middle" text-anchor="middle" >${foreDaily[i].uvIndex}</text>
                                    <text id="text11" x="50" y="65" dominant-baseline="middle" text-anchor="middle" style="font-size:12px">${uvIndex[foreDaily[i].uvIndex > 11 ? 11 : foreDaily[i].uvIndex]}</text>
                                  </svg>
                                </div>
                              </div>
                              <div>
                                <div class="FlexDayDet-111">Precipitation</div>
                                <div>
                                  <svg>
                                    <circle cx="50" cy="55" r="45" stroke="rgba(255,255,255,0.3)" stroke-width="6.5" fill="none" />
                                    <svg>
                                      <path d="${describeArc(foreDaily[i].precipProb * 3.6)}" fill="none" stroke="#6ce0e0" stroke-width="6.5" />
                                    </svg>
                                    <text  x="50" y="55" dominant-baseline="middle" text-anchor="middle">${foreDaily[i].precipProb}%</text>
                                  </svg>
                                </div>
                              </div>
                              <div>
                                <div class="FlexDayDet-111">Humidity</div>
                                <div>
                                  <svg>
                                    <circle cx="50" cy="55" r="45" stroke="rgba(255,255,255,0.3)" stroke-width="6.5" fill="none" />
                                    <svg>
                                      <path d="${describeArc(Math.round((foreDaily[i].maxRelHumidity + foreDaily[i].minRelHumidity) * 1.8))}" fill="none" stroke="#6ce0e0" stroke-width="6.5" />
                                    </svg>
                                    <text x="50" y="55"  dominant-baseline="middle" text-anchor="middle">${Math.round((foreDaily[i].maxRelHumidity + foreDaily[i].minRelHumidity) / 2)}%</text>
                                  </svg>
                                </div>
                              </div>
                              <div>
                                <div class="FlexDayDet-111">Cloudiness</div>
                                <div>
                                  <svg>
                                    <circle cx="50" cy="55" r="45" stroke="rgba(255,255,255,0.3)" stroke-width="6.5" fill="none" />
                                    <svg>
                                      <path d="${describeArc(foreDaily[i].cloudiness * 3.6)}" fill="none" stroke="#6ce0e0" stroke-width="6.5" />
                                    </svg>
                                    <text x="50" y="55" dominant-baseline="middle" text-anchor="middle">${foreDaily[i].cloudiness}%</text>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>`);
    }

  }
  if (once == 0) {
    document.getElementById("dayDetCont").innerHTML = `<div class="subHead">Day Details</div>
                                                                        ${dayDetHtml[0]}`;
    document.getElementById("back").src = `${imgSrc1[imgSrc[current.weather[0].icon]]}&auto=format&fit=crop&w=${scWidth}&q=80&h=${scHeight}`;
  }
  once = 1;
  document.getElementById("currentCont").innerHTML = cHtml;
  document.getElementById("addCont").innerHTML = addHtml;
  document.getElementById("dailyMenuCont").innerHTML = `<div class="subHead">Daily</div>
                                                            <div id="dailyMenu" class="scrollmenuDaily animation"> ${ddHtml} </div>`;
  document.getElementById(`bc${dch}`).style.background = "rgba(212, 205, 205, 0.2)";
  document.getElementById("hourlyMenuCont").innerHTML = `<div class="subHead">Hourly</div>
                                                             <div id="hourlyMenu" class="scrollmenuHourly animation"> ${hdHtml[dch]} </div>`;
}

function dataAvail(time) {
  if (time == null) { return "No Data"; }
  else {
    let arr = time.split(":");
    return `${getHours(parseInt(arr[0]))} : ${arr[1]} ${getAmpm(parseInt(arr[0]))}`;
  }
}

function getAmpm(hours) {
  if (hours == 0) { return "AM"; }
  else {
    return hours > 11 ? "PM" : "AM";
  }
}

function getHours(hours) {
  if (hours == 0) { return 12; }
  else {
    return hours > 12 ? (hours - 12) : hours;
  }
}

function hDetails(i) {
  document.getElementById(`bc${dch}`).style.background = "transparent";
  document.getElementById(`bc${i}`).style.background = "rgba(212, 205, 205, 0.2)";
  dch = i;
  document.getElementById("hourlyMenuCont").innerHTML = `<div class="subHead">Hourly</div>
                                                          <div id="hourlyMenu" class="scrollmenuHourly animation"> ${hdHtml[i]} </div>`;
  document.getElementById("dayDetCont").innerHTML = `<div class="subHead">Day Details</div>
                                                          ${dayDetHtml[i]}`;
}

function changeUnit() {
  if (CF == "C") {
    CF = "F";
    CF1 = "C"
  }
  else {
    CF = "C";
    CF1 = "F"
  }
  store1();
}
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(endAngle) {
  if (endAngle == null) endAngle = 0;
  if (endAngle == 360) endAngle = 359.99;
  let x = 50, y = 55, radius = 45, startAngle = 0;
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);
  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  var d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
  return d;
}




