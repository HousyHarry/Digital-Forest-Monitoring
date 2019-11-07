import { Map, View } from "ol";
import "ol/ol.css";
import { orthoBasemap } from "./basemap_util";
const viewerUtil = {
  model: {
    /*
     * the element with the homepage content.
     */
    content: document.getElementsByClassName("content")[0]
  },
  controller: {
    /*
     * calls the necessary functions to display the viewer.
     */
    init: () => {
      viewerUtil.controller.removeContent();
      viewerUtil.controller.createContainer();
      viewerUtil.controller.showViewer();
    },
    /*
     * removes 'old' content like homepage, services etc.
     */
    removeContent: () => {
      viewerUtil.model.content.innerHTML = "";
    },
    /*
     * displays the ol viewer
     */
    createContainer: () => {
      viewerUtil.model.viewerContainer = viewerUtil.view.getViewerContainer();
      viewerUtil.model.content.appendChild(viewerUtil.model.viewerContainer);
    },
    /*
     * display the ol viewer inside the viewer container
     */
    showViewer: () => {
      viewerUtil.model.map = new Map({
        view: new View({
          center: [829300, 5933555], //Bern
          zoom: 11,
          minZoom: 9,
          maxZoom: 21
        }),
        layers: [orthoBasemap],
        target: "map"
      });
      viewerUtil.model.map.addEventListener("click", e => console.log(e));
    }
  },
  view: {
    /*
     * creates a full width/height container for the  viewer
     */
    getViewerContainer: () => {
      const viewerContainer = document.createElement("div");
      viewerContainer.id = "map";
      viewerContainer.style.width = "100vw";
      viewerContainer.style.height = "calc(100vh - 64px)";
      return viewerContainer;
    }
  }
};
export default viewerUtil;
