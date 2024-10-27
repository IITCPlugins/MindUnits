
// Libs
global.L = require("leaflet");
// global.$ = require("jquery");
jest.spyOn(window, 'alert').mockImplementation(() => { });

// IITC
document.body.innerHTML = '<div id="map"></div>';


window.addHook = function (event, callback) {
    console.assert(typeof (event) === "string");
};

window.addLayerGroup = function (name, layerGroup, defaultDisplay, group) { }
window.isLayerGroupDisplayed = function (name, defaultDisplay) { return defaultDisplay; }

window.escapeHtmlSpecialChars = function (str) {
    var div = document.createElement(div);
    var text = document.createTextNode(str);
    div.appendChild(text);
    return div.innerHTML;
}


window.map = new L.Map('map', {
    center: [0, 0],
    zoom: 1,
    minZoom: 3,
    markerZoomAnimation: false,
    bounceAtZoomLimits: false,
    maxBoundsViscosity: 0.7,
    worldCopyJump: true, // wrap longitude to not find ourselves looking beyond +-180 degrees
});


window.mapDataRequest = {
    render: {
        bringPortalsToFront: () => { }
    }
}

L.geodesicPolyline = L.polyline;
L.geodesicPolygon = L.polygon;


global.TEAM_ENL = 2;
global.TEAM_RES = 1;
global.TEAM_NONE = 0;