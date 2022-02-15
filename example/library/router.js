export const go = route => {
  window.history.pushState(null, null, route);
  window.dispatchEvent(new CustomEvent("route"));
};
