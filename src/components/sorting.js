import {
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  sortingEl,
  state,
} from "../common.js";
import renderJobList from "./JobList.js";
import renderPageBtn from "./Pagination.js";

const clickHandler = (event) => {
  const clickedSortingBtn = event.target.closest(".sorting__button");
  if (!clickedSortingBtn) return;

  state.currentPage=1;
  const rcentBtn =
    clickedSortingBtn.className.includes("--recent") ? true : false;
  if (rcentBtn) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }
  renderPageBtn();
  renderJobList();
};
sortingEl.addEventListener("click", clickHandler);
