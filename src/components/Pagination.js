import {state,paginationBtnBackEl,
    paginationBtnNextEl,
    paginationEl,
    paginationNumberBackEl,
    paginationNumberNextEl} 
    from '../common.js';
import renderJobList from './JobList.js';
    
const renderPageBtn=()=>{
    if(state.currentPage>=2){
       paginationBtnBackEl.classList.remove('pagination__button--hidden')
    }else{
         paginationBtnBackEl.classList.add('pagination__button--hidden')
    }

if(state.searchJobItems.length - state.currentPage*7<=0){
       paginationBtnNextEl.classList.add('pagination__button--hidden')
}else{
    paginationBtnNextEl.classList.remove('pagination__button--hidden')
}


paginationNumberBackEl.textContent=state.currentPage++;
paginationNumberNextEl.textContent=state.currentPage--;

paginationBtnBackEl.blur();
paginationBtnNextEl.blur();

}

const pagingHandler=event=>{
    const paginationBtn=event.target.closest('.pagination__button')

    console.log(paginationBtn);
if(!paginationBtn) return;
const nextPage=paginationBtn.className.includes('--next')?true:false;

console.log(nextPage);
nextPage ? state.currentPage++ : state.currentPage--;

renderPageBtn();
renderJobList();

}

paginationEl.addEventListener('click',pagingHandler);

export default renderPageBtn;
