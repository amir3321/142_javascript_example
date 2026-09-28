import {  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  searchFormEl,
  searchInputEl,
  jobListSearchEl,
  spinnerSearchEl,
  errorTextEl,
  errorEl,
  numberEl,
  BASE_URL,
  getData,
  state,
} from "../common.js";
import renderError from "./Error.js";
import renderJobList from "./JobList.js";
import renderPageBtn from "./Pagination.js";
import renderSpinner from "./Spinner.js";

const submitHandler = async (event) => {
  event.preventDefault();
  const searchText = searchInputEl.value;

  const patternCheck = /[0-9]/;
  const patternMatch = patternCheck.test(searchText);
  if (patternMatch) {
    renderError();
    return;
  }
  //console.log(searchText);
  searchInputEl.blur();
  renderSpinner("search");

   sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");

  try {
    const data = await getData(`${BASE_URL}/jobs?search=${searchText}`);

    //const response = await fetch(`${BASE_URL}/jobs?search=${searchText}`);
    //const data = await response.json();

    // if (!response.ok) {
    //   throw new Error("wrong response ...!");
    // }

    const { jobItems } = data;

    state.searchJobItems = jobItems;

    numberEl.textContent = jobItems.length;

    renderSpinner("search");
    state.currentPage = 1;
    renderPageBtn();
    renderJobList();
  } catch (error) {
    renderError(error.message);
    console.log(error.message);
    renderSpinner("search");
  }

  // fetch(`${BASE_URL}/jobs?search=${searchText}`)
  //     .then((response) => {

  //         if (!response.ok) {
  //             throw new Error('wrong ...!')

  //            // console.log('wrong ...!');
  //         }
  //         return response.json();
  //     })
  //     .then((data) => {
  //         const { jobItems } = data;
  //         //console.log(data);
  //         numberEl.textContent = jobItems.length;

  //         renderSpinner('search');

  //        renderJobList(jobItems);
  //     })
  //     .catch((error) => {
  //         console.log(error.message)
  //         renderSpinner('search');

  //     });
};
searchFormEl.addEventListener("submit", submitHandler);
