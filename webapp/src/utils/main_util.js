import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { getCenter } from "ol/extent";
import { dialog } from "./init";
export const topAppBarRight = document.querySelector(
  ".top-app-bar__section--align-end"
);
const appBarTitle = document.getElementsByClassName("top-app-bar__title")[0];
const sidebarContent = document.querySelector(".sidebar__content");
export const sidebar = document.querySelector(".sidebar");
export const content = document.getElementsByClassName("content")[0];

/*
 * removes the content below the appBar.
 */
export const removeContent = () => {
  content.innerHTML = "";
};

/*
 * creates the grid layout containing description.
 * @returns {HTMLElement} grid - a div with a MDCGrid inside.
 */
export const createGrid = () => {
  const grid = document.createElement("div");
  const gridInner = document.createElement("div");
  grid.classList.add("mdc-layout-grid");
  gridInner.classList.add("mdc-layout-grid__inner");
  grid.appendChild(gridInner);
  return grid;
};

/*
 * changes the top appbar title.
 * @param {string} title - the new title to display.
 * @returns {boolean} - true if title changed successfully, false otherwise.
 */
export const setTitle = title => {
  if (!title) {
    return false;
  }
  appBarTitle.innerHTML = title;
  return true;
};

/*
 * remove old video links from the top-app-bar and add add a new one.
 * @param {object} params - function parameter object.
 * @param {string} params.title - the video title.
 * @param {string} params.id - youtube video id.
 * @returns {boolean} - true in case of success, false otherwise.
 */
export const addVideoLink = ({ title, videoId } = {}) => {
  if (!videoId) {
    return false;
  }
  removeVideoLink();
  topAppBarRight.appendChild(getVideoLink({ title, videoId }));
  return true;
};

/*
 * remove the video link from the top-app-bar
 */
export const removeVideoLink = () => {
  if (topAppBarRight.children.length === 3) {
    topAppBarRight.removeChild(topAppBarRight.children[2]);
  }
};

/*
 * creates a top-app-bar video link.
 * @param {object} params - function parameter object.
 * @param {string} params.title - the video title.
 * @param {string} params.videoId - youtube video id.
 * @returns {domElement} - image link which opens a modal with the video.
 */
export const getVideoLink = ({ title, videoId } = {}) => {
  if (!videoId) {
    return false;
  }
  const videoLink = document.createElement("button");
  videoLink.classList.add(
    "material-icons",
    "mdc-top-app-bar__action-item",
    "mdc-icon-button"
  );
  videoLink.ariaLabel = "video";
  videoLink.innerHTML = "live_tv";
  videoLink.title = "Erkl??rungsvideo";
  videoLink.addEventListener("click", () => {
    dialogTitle.innerHTML = `Dokumentation ${title}`;
    dialogContent.innerHTML = getVideoElement(videoId);
    dialog.open();
  });
  return videoLink;
};

export const getVideoElement = videoId =>
  `<div class="videoWrapper"><iframe width="560" height="349" src="https://www.youtube.com/embed/${videoId}?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;

/*
 * calculates the title based on the window.width.
 * @returns {string} title - title to use based on the current window.width.
 */
export const getTitle = () => {
  const width = window.innerWidth;
  const title =
    width <= 550
      ? "Waldmonitoring"
      : "Waldmonitoring mit Sentinel Satellitenbildern";
  return title;
};

/*
 * hide the appBar title
 */
export const hideTitle = () => {
  appBarTitle.style.display = "none";
};
/*
 * show the appBar title
 */
export const showTitle = () => {
  appBarTitle.style.display = "block";
};

export const impressum = {
  tite: "IMRESSUM",
  content: `Dies ist ein Forschungsprojekt der BFH-HAFL im Auftrag bzw. 
  mit Unterst??tzung des BAFU. Im Rahmen dieses Projektes sollen vorhandene, 
  m??glichst schweizweit fl??chendeckende und frei verf??gbare Fernerkundungsdaten 
  f??r konkrete Use-Cases und mit einem klaren Mehrwert f??r die Praxis eingesetzt werden. 
  Das Hauptziel dieses Projektes ist die Implementierung von Kartenviewern sowie 
  Geodiensten zu den entsprechenden Use-Cases.
<br /></br />
<strong>Zur Zeit sind die bereitgestellten Daten und Services ausschliesslich f??r Testzwecke gedacht.</strong>
<br />
<h4 style="margin-bottom:8px">Ansprechpersonen:</h4>
<strong>BFH-HAFL:</strong> Alexandra Erbach (+41 31 910 22 75,
<a href="mailto:alexandra.erbach@bfh.ch">alexandra.erbach@bfh.ch</a>)<br />
<strong>Website/Geodienste:</strong> Karten-Werk GmbH, Hanskaspar Frei, (+41 79 360 72 83,
  <a href="mailto:hkfrei@karten-werk.ch">hkfrei@karten-werk.ch</a>)</p>`
};

export const getLayerInfo = overlay => {
  return `<div>
  <h4>Legende:</h4>
  <img src="https://geoserver.karten-werk.ch//wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&height=15&LAYER=${overlay.layername}&legend_options=forceLabels:on"  alt="legende"/>
  <h4>Beschreibung:</h4>
  <section>${overlay.description}</section>
  </div>`;
};

export const dialogTitle = document.querySelector("#dialog-title");
export const dialogContent = document.querySelector("#dialog-content");
export const searchResults = document.querySelector(".autocomplete");

/*
 *  set the position of the search result box below the search input.
 */
export const positionSearchResultContainer = () => {
  const searchInput = document.querySelector(".mdc-text-field");
  const searchMetrics = searchInput.getBoundingClientRect();
  searchResults.style.left = `${searchMetrics.left}px`;
  searchResults.style.width = `${searchMetrics.width}px`;
};

/*
 * debounce function for the places search
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * credits:https://davidwalsh.name/javascript-debounce-function
 */

export const debounce = (func, wait, immediate) => {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

/*
 * geojson display styles.
 */
const image = new CircleStyle({
  radius: 5,
  fill: null,
  stroke: new Stroke({ color: "red", width: 4 })
});

const styles = {
  Point: new Style({
    image: image
  }),
  LineString: new Style({
    stroke: new Stroke({
      color: "yellow",
      width: 4
    })
  }),
  MultiLineString: new Style({
    stroke: new Stroke({
      color: "yellow",
      width: 4
    })
  }),
  MultiPoint: new Style({
    image: image
  }),
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "yellow",
      width: 4
    }),
    fill: new Fill({
      color: "rgba(255, 0, 0, 0.3)"
    })
  }),
  Polygon: new Style({
    stroke: new Stroke({
      color: "blue",
      lineDash: [4],
      width: 4
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)"
    })
  }),
  GeometryCollection: new Style({
    stroke: new Stroke({
      color: "magenta",
      width: 2
    }),
    fill: new Fill({
      color: "magenta"
    }),
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: "magenta"
      })
    })
  }),
  Circle: new Style({
    stroke: new Stroke({
      color: "red",
      width: 2
    }),
    fill: new Fill({
      color: "rgba(255,0,0,0.2)"
    })
  })
};

/*
 * get the right style for a geojson.
 * @param {object} feature - geojson feature.
 * @returns {object} ol/Style object.
 */
const styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};

/*
 * Adds a Geojson Object to the openlayers map
 * @param {object} geojson - valid geojson object
 * @returns {object} geojsonLayer - ol VectorLayer instance or null in case of failure
 */
export const displayGeojson = ({ geojson, map } = {}) => {
  if (!geojson || !map) {
    return false;
  }
  removeGeojsonOverlays(map);
  const vectorSource = createOlVectorSource(geojson);
  const geojsonLayer = new VectorLayer({
    source: vectorSource,
    style: styleFunction,
    zIndex: map.getLayers().getLength()
  });
  geojsonLayer.type = "geojson";
  map.addLayer(geojsonLayer);
  const extent = vectorSource.getExtent();
  map.getView().setCenter(getCenter(extent));
  return geojsonLayer;
};

/*
 * Removes every Geojson overlay from the openlayers map
 * @param {object} map - openlayers map object.
 * @returns {boolean} true in case of success, false otherwise.
 */
export const removeGeojsonOverlays = map => {
  if (!map) {
    return false;
  }
  map.getLayers().forEach(layer => {
    if (layer.type === "geojson") {
      map.removeLayer(layer);
    }
  });
  return true;
};
/*
 * creates an openLayers vector source object based on geojson.
 * @param {object} geojson - the geojson used by the source.
 * @returns {object} VectorSource - ol/source/Vector object
 */
const createOlVectorSource = geojson => {
  return new VectorSource({
    features: new GeoJSON().readFeatures(geojson)
  });
};

/*
 * opens the sidebar to display legends, infos etc.
 * @param {object} params
 * @param {DomElement} params.content - the content to display inside the sidebar.
 */
export const openSidebar = ({ content = null } = {}) => {
  sidebar.style.zIndex = 5;
  sidebar.style.transform = "scale(1)";
  if (content) {
    sidebarContent.appendChild(content);
  }
};

export const closeSidebar = () => {
  sidebarContent.innerHTML = "";
  sidebar.style.transform = "scale(0,1)";
  window.setTimeout(() => {
    sidebar.style.zIndex = -1;
  }, 400);
};
