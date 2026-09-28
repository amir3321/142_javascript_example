import { spinnerSearchEl, spinnerJobDetailsEl } from "../common.js";

const renderSpinner = (whichSpinner) => {
  const spinnerEl =
    whichSpinner === "search" ? spinnerSearchEl : spinnerJobDetailsEl;
  // spinnerEl.className.includes('spinner--visible')?
  // spinnerEl.classList.add('spinner--hidden') : spinnerEl.classList.add('spinner--visible')
  spinnerEl.classList.toggle("spinner--visible");
};

export default renderSpinner;
