// Modal Overlays
export const setOverlay = (overlay) => {
  overlay.current.classList.add("overlay");
};

export const removeOverlay = (overlay) => {
  overlay.current.classList.remove("overlay");
};

// active class toggle

export const setActiveClass = (activeToggle) => {
  activeToggle.current.classList.add("active");
};
export const removeActiveClass = (activeToggle) => {
  activeToggle.current.classList.remove("active");
};
