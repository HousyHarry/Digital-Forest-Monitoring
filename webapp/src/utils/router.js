import Navigo from "navigo";
import homepageUtil from "./homepage_util";
import viewerUtil from "./viewer_util";
import servicesUtil from "./services_util";
import descriptionUtil from "./description_util";
import {
  setTitle,
  getTitle,
  showTitle,
  hideTitle,
  positionSearchResultContainer,
  closeSidebar,
  sidebar,
  addVideoLink,
  removeVideoLink
} from "./main_util";
export const router = new Navigo(null, false, "#");
export const initRouter = () => {
  router
    .on({
      "/": () => {
        textField.style.display = "none";
        homepageUtil.controller.init();
        setTitle(getTitle());
        showTitle();
        removeVideoLink();
      },
      "/veraenderung": () => {
        // we dont't want a short sidebar transition on startup
        // that's why we add it here, after the app has loaded.
        sidebar.style.transition = "transform 0.3s";
        hideTitle();
        textField.style.display = "inline-flex";
        addVideoLink({
          title: "jährliche Veränderung",
          videoId: "mYK2KJqgrhM"
        });
        viewerUtil.controller.init({ title: "Jährliche Veränderung" });
        positionSearchResultContainer();
      },
      "/stoerungen": () => {
        // we dont't want a short sidebar transition on startup
        // that's why we add it here, after the app has loaded.
        sidebar.style.transition = "transform 0.3s";
        hideTitle();
        textField.style.display = "inline-flex";
        addVideoLink({ title: "natürliche Störungen", videoId: "aamvbhKXoNU" });
        viewerUtil.controller.init({ title: "Natürliche Störungen" });
        positionSearchResultContainer();
      },
      "/vitalitaet": () => {
        // we dont't want a short sidebar transition on startup
        // that's why we add it here, after the app has loaded.
        sidebar.style.transition = "transform 0.3s";
        hideTitle();
        textField.style.display = "inline-flex";
        addVideoLink({
          title: "hinweiskarten zur Vitalität",
          videoId: "wraBOBSfcdk"
        });
        viewerUtil.controller.init({ title: "Vitalität der Wälder" });
        positionSearchResultContainer();
      },
      "/services": () => {
        removeVideoLink();
        servicesUtil.controller.init();
        setTitle("Geodienste");
      },
      "/projektbeschrieb": () => {
        removeVideoLink();
        setTitle("Projektbeschrieb");
        descriptionUtil.controller.init();
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    })
    .resolve();

  router.notFound(() => homepageUtil.controller.createHomepageCards());
  /* register the click event listener for the home button
   * this event listener is currently in this place, because here it has access to the router.
   * normally this belongs to init.js and will probably be moved in the future
   */
  document.querySelector("#home-button").addEventListener("click", () => {
    closeSidebar();
    router.navigate("/");
  });
};

const textField = document.querySelector(".mdc-text-field");
