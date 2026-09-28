import {
  jobDetailsEl,
  jobListSearchEl,
  jobDetailsContentEl,
  spinnerJobDetailsEl,
  BASE_URL,
  getData,state
} from "../common.js";
import renderError from "./Error.js";
import renderJobDetail from "./JobDetail.js";
import renderSpinner from "./Spinner.js";

const renderJobList = () => {
    jobListSearchEl.innerHTML='';
  state.searchJobItems.slice(state.currentPage*7-7, state.currentPage*7).forEach((jobItem) => {
    const jobItemHtml = `
            <li class="job-item">
                        <a class="job-item__link" href="${jobItem.id}">
                            <div class="job-item__badge">${jobItem.badgeLetters}</div>
                            <div class="job-item__middle">
                                <h3 class="third-heading">${jobItem.title}</h3>
                                <p class="job-item__company">${jobItem.company}</p>
                                <div class="job-item__extras">
                                    <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}</p>
                                </div>
                            </div>
                            <div class="job-item__right">
                                <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                                <time class="job-item__time">${jobItem.daysAgo}d</time>
                            </div>
                        </a>
                    </li>
            `;
    jobListSearchEl.insertAdjacentHTML("beforeend", jobItemHtml);
  });
};

export default renderJobList;

const clickHandler = async (event) => {
  event.preventDefault();
  const jobItem = event.target.closest(".job-item");

  document
    .querySelector(".job-item--active")
    ?.classList.remove("job-item--active");
  jobItem.classList.add("job-item--active");
  jobDetailsContentEl.innerHTML = "";
  //spinnerJobDetailsEl.classList.add('spinner--visible')
  renderSpinner();
  const jobId = jobItem.children[0].getAttribute("href");
  history.pushState(null,null,`/#${jobId}`)

  try {

    const data =await getData(`${BASE_URL}/jobs/${jobId}`);
    // const response = await fetch(`${BASE_URL}/jobs/${jobId}`);
    // const data = await response.json();

    // if (!response.ok) {
    //   throw new Error("wrong response ...!");
    // }

    const { jobItem } = data;
    renderSpinner();
    renderJobDetail(jobItem);
  } catch (error) {
    renderError(error.message);
    console.log(error.message);
    renderSpinner();
  }

  //    fetch(`${BASE_URL}/jobs/${jobId}`)
  //    .then(response=>{
  //     if(!response.ok){throw new Error('wrong!!!'); return;}
  //     return response.json();
  //    })
  //    .then(data=>{
  //     const {jobItem}=data;
  //     renderSpinner();
  //     renderJobDetail(jobItem);

  //    })
  //    .catch(error=>{
  //         console.log(error.message)
  //        renderSpinner();
  //     })
};
jobListSearchEl.addEventListener("click", clickHandler);
